import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {ChapterService} from "../chapter.service";
import {Chapter} from "../../models/chapter";
import {Router} from "@angular/router";
import {BookService} from "../book.service";
import {UserService} from "../user.service";
import {CurrentlyReading} from "../../models/currentlyreading";
import {tryCatch} from "rxjs/util/tryCatch";

@Component({
  selector: 'wn-navigation-graph',
  templateUrl: './navigation-graph.component.html',
  styleUrls: ['./navigation-graph.component.css']
})
export class NavigationGraphComponent implements OnInit, OnChanges {

  @ViewChild('navgraph') graphContainer: ElementRef;
  rootChapterId: string;
  @Input() chapterId: string;
  @Output() addChapterToNode: EventEmitter<string>;
  private margin: any = {top: 20, bottom: 20, left: 20, right: 100};
  private graph: any;
  private width: number;
  private height: number;

  bookId: string;
  private tree: any;
  rootChapter: Chapter;
  root: any;

  chapterTrail: string[] = [];

  constructor(private chapterService: ChapterService,
              private bookService: BookService,
              private router: Router,
              private userService: UserService) {
    this.addChapterToNode = new EventEmitter();
  }

  ngOnInit() {

    this.chapterService.getChapter(this.chapterId).subscribe(chapter => {
      if (!chapter.book) {
        this.rootChapterId = this.chapterId;
        this.chapterTrail.push(this.rootChapterId);
        this.createGraph();
        this.getData();
      } else {
        this.bookService.getBook(chapter.book).subscribe(book => {
          this.rootChapterId = book.startChapter;
          this.bookId = book._id;
          this.userService.getCurrentlyReading(book._id).subscribe(cr => {
            if (cr) {
              this.chapterTrail = cr.chapterTrail;
            } else {
              this.chapterTrail.push(this.rootChapterId);
            }
            this.createGraph();
            this.getData();
          });
        });
      }
    });
  }

  updateCurrentlyReading() {
    let currentlyReading: CurrentlyReading = {
      book: this.bookId,
      chapterTrail: this.chapterTrail
    };

    this.userService.updateCurrentlyReading(currentlyReading).subscribe();
  }

  getData() {
    this.chapterService.getChapter(this.rootChapterId).subscribe(chapter => {

      this.rootChapter = chapter;
      this.getChildren(chapter, 0, 20);
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
          if(this.chapterTrail.indexOf(childChapter._id) > -1){
            this.getChildren(childChapter, currentDepth + 1, maxDepth);
          }
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

    svg.append("rect")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.bottom + this.margin.top)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(d3.zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", function () {
          d3.select('g.graph').attr("transform", d3.event.transform);
        }));

    this.graph = svg.append('g')
      .attr('class', 'graph')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.tree = d3.tree().size([this.height, this.width]);

  }

  private update(source) {
    let duration = 1000;
    try {
      this.root = d3.hierarchy(this.rootChapter, (d) => {
        return d.children;
      });

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
    } catch (e) {
      //Sometimes it complains about d.data not being set but it doesn't seem
      //to affect anything
      //console.log('Error when parsing hierarchy');
    }
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
      });


    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function (d) {
        return d.data.childrenIds.length && !d.children ? "teal" : "#fff";
      });
    //Add buttons
    var addChapterButton = nodeEnter.append('g')
      .attr('class', 'button add-chapter')
      .on('click', (d) => {
        this.addChapterToNode.emit(d.data._id);
      });
    addChapterButton
      .append('circle')
      .attr('r', 10)
      .attr('transform', function (d) {
        return `translate(25, -25)`;
      })
      .style('fill', 'green');

    addChapterButton
      .append('text')
      .style('fill', 'white')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', function (d) {
        return '0.8em'
      })
      .attr('transform', function (d) {
        return `translate(25, -25)`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.4em')
      .text('\uf067');

    var expandButton = nodeEnter
      .append('g')
      .attr('class', 'button expand')
      .on('click', click);
    expandButton
      .append('circle')
      .attr('r', 10)
      .attr('transform', function (d) {
        return `translate(35, 0)`;
      })
      .style('fill', 'teal');
    expandButton
      .append('text')
      .style('fill', 'white')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', function (d) {
        return '0.8em'
      })
      .attr('transform', function (d) {
        return `translate(35, 0)`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.4em')
      .text('\uf061');

    var viewButton = nodeEnter
      .append('g')
      .attr('class', 'button view')
      .on('click', (d) => {
        if (d.parent) {
          let parent = d.parent;
          let trailAppend: string[] = [];
          while (this.chapterTrail.indexOf(parent.data._id) === -1 || !parent) {
            trailAppend.push(parent.data._id);
            parent = parent.parent;
          }
          trailAppend.reverse();
          let deleteIndex = this.chapterTrail.indexOf(parent.data._id);
          this.chapterTrail.splice(deleteIndex + 1, this.chapterTrail.length);
          this.chapterTrail = this.chapterTrail.concat(trailAppend);
          this.chapterTrail.push(d.data._id);
        }
        this.updateCurrentlyReading();
        this.update(d);
        this.router.navigate(['read', d.data._id]);
      });
    viewButton
      .append('circle')
      .attr('r', 10)
      .attr('transform', function (d) {
        return `translate(25, 25)`;
      })
      .style('fill', 'rgb(19, 70, 123)');
    viewButton
      .append('text')
      .style('fill', 'white')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', function (d) {
        return '0.8em'
      })
      .attr('transform', function (d) {
        return `translate(25, 25)`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.4em')
      .text('\uf06e');

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", "3.5em")
      .attr("x", function (d) {
        return d.children || d._children ? -13 : -10;
      })
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
      })
      .attr('class', 'title-text')
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
      .attr('r', 20)
      .style("fill", function (d) {
        return d.data.childrenIds.length && !d.children ? "teal" : "#fff";
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
      })
      .style('stroke', (d) => {
        if (this.chapterTrail.indexOf(d.data._id) > -1) {
          return 'green';
        }
      })
      .style('stroke-width', (d) => {
        if (this.chapterTrail.indexOf(d.data._id) > -1) {
          return '6px';
        }
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);
    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      })
      .style('stroke', (d) => {
        if (this.chapterTrail.indexOf(d.data._id) > -1) {
          return 'green';
        }
      })
      .style('stroke-width', (d) => {
        if (this.chapterTrail.indexOf(d.data._id) > -1) {
          return '6px';
        }
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
      if (d.data.childrenIds && !d.children) {
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
      } else {
        console.log('second triggered');
        d._children = d.children;
        d.data.children = null;
        d.children = null;
        self.update(d);
      }
    }
  }

}
