import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategories } from '../../shared/interfaces/icategories';


@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  
  private readonly productsService= inject(ProductsService);
  private readonly categoriesService= inject(CategoriesService);
  products:Iproduct[]=[];
  categories:Icategories[]=[];

  getProductsData():void{
    this.productsService.getAllProduct().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.products=res.data;
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }
  getCategoriesData():void{
    this.categoriesService.getAllGategories().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.categories = res.data;
        
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }
  ngOnInit():void{
    this.getProductsData();
    this.getCategoriesData();
    
  }

}
