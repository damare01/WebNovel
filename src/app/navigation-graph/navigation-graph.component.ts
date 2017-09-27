import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {ChapterService} from "../chapter.service";
import {Chapter} from "../../models/chapter";

@Component({
  selector: 'wn-navigation-graph',
  templateUrl: './navigation-graph.component.html',
  styleUrls: ['./navigation-graph.component.css']
})
export class NavigationGraphComponent implements OnInit, OnChanges {

  @ViewChild('navgraph') graphContainer: ElementRef;
  @Input() rootChapterId: string;
  private margin: any = {top: 20, bottom: 20, left: 20, right: 100};
  private graph: any;
  private width: number;
  private height: number;

  private tooltip: any;
  private tree: any;
  rootChapter: Chapter;
  root: any;

  constructor(private chapterService: ChapterService) {
  }

  ngOnInit() {
    this.createGraph();
    this.getData();
  }

  getData() {
    this.chapterService.getChapter(this.rootChapterId).subscribe(chapter => {

      this.rootChapter = chapter;
      this.getChildren(chapter, 0, 20);
      //this.data = chapter;
      /*this.root = d3.hierarchy(this.data, function (d) {
        return d.children;
      });
      this.root.x0 = this.height / 2;
      this.root.y0 = 0
      this.update(this.root);*/
    });
  }

  getChildren(chapter: Chapter, currentDepth: number, maxDepth: number) {
    if (currentDepth === maxDepth + 1) {
      return;
    }
    let childrenLength = chapter.childrenIds.length;
    let counter = 0;
    if (!childrenLength) {
      chapter.children = null;
    } else if (chapter.childrenIds) {
      chapter.childrenIds.forEach((childId, i) => {
        this.chapterService.getChapter(childId).subscribe(childChapter => {
          if (!chapter.children) {
            chapter.children = [];
          }
          chapter.children.push(childChapter);
          if (++counter >= childrenLength) {
            this.root = d3.hierarchy(chapter);
            this.root.x0 = this.height / 2;
            this.root.y0 = 0;
            this.update(this.root);
          }
          // this.getChildren(childChapter, currentDepth + 1, maxDepth);
        })
      });
    }

  }

  ngOnChanges() {
    /*if (this.graph) {
      this.updateGraph();
    }*/
  }

  private createGraph() {
    let element = this.graphContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    this.graph = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    svg.append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(d3.zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", function () {
          d3.select('g').attr("transform", d3.event.transform);
        }));
    this.tree = d3.tree().size([this.height, this.width]);
    this.tooltip = d3.select('svg').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

  }

  private update(source) {
    console.log('updating');

    let duration = 1000;
    this.root = d3.hierarchy(this.rootChapter);
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;
    var treeData = this.tree(this.root);
    // Compute the new tree layout.
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);
    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 180
    });

    // ****************** Nodes section ***************************
    // Update the nodes...
    var node = this.graph.selectAll('g.node')
      .data(nodes, function (d) {
        return d.data._id;
      });
    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', click)
      .on('mouseover', (d) => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        this.tooltip.html(d.data.body)
          .style('left', d.x + 'px')
          .style('top', d.y + 'px');
      })
      .on('mouseout', (d) => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      });
    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", "1.5em")
      .attr("x", function (d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function (d) {
        return d.data.title;
      });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);
    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');
    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();
    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);
    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************
    // Update the links...
    var link = this.graph.selectAll('path.link')
      .data(links, function (d) {
        return d.data._id;
      });
    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function (d) {
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });
    // UPDATE
    var linkUpdate = linkEnter.merge(link);
    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      });
    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        console.log('link exiting');
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();
    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
      return path
    }

    // Toggle children on click.
    let self = this;

    function click(d) {
      if (d.data.childrenIds && !d.children && !d._children) {
        console.log('first triggered');
        //console.log(d);
        let counter = 0;
        d.data.childrenIds.forEach((childId, i) => {
          self.chapterService.getChapter(childId).subscribe(childChapter => {
            if (!d.children) {
              d.children = [];
            }
            if (!d.data.children) {
              d.data.children = [];
            }
            d.data.children[i] = childChapter;
            if (++counter >= d.children.length) {
              self.update(d);
            }
          })
        })
      } else if (d.children) {
        console.log('second triggered');
        d._children = d.children;
        d.data.children = null
        d.children = null;
        self.update(d);
      } else {
        console.log('third triggered');
        d.children = d._children;
        d._children = null;
        self.update(d);
      }
    }
  }

}
