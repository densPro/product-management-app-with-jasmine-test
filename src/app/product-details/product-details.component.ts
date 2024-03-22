import { Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productForm: FormGroup;
  product!: Product;
  loading = false;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
  }

  loadProduct(productId: number): void {
    this.loading = true;
    this.productService.getProduct(productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
        });
        this.loading = false;
        this.triggerResize();
      },
      (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        id: this.product?.id,
      } as Product;

      this.loading = true;
      this.productService
        .updateProduct(formData)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.productForm.reset();
            this.router.navigateByUrl(`/`);
          },
          error: (error) => {
            this.loading = false;
          },
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigateByUrl(`/`);
  }

  deleteProduct(): void {
    this.loading = true;
    this.productService
      .deleteProduct(this.product.id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigateByUrl(`/`);
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
