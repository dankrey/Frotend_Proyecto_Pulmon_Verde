import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../servicios/serviceblog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  articles: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.blogService.getAllArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
      }
    );
  }
}