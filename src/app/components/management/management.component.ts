import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie-model';
import { Produit } from 'src/app/models/produit-model';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  categories: Categorie[];
  produits: Produit[];

  // tslint:disable-next-line:max-line-length
  constructor(private serviceCategorie: CategorieService, private serviceProduit: ProduitService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.serviceCategorie.allCategorie().subscribe(
      (res) => this.categories = res
    );
    this.serviceProduit.allProduit().subscribe(
      (res) => this.produits = res
    );
  }

  deleteProduit(produit: Produit) {
    const index = this.produits.indexOf(produit);
    this.produits.splice(index, 1);

    this.serviceProduit.deleteProduit(produit.id).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Hello world!', 'Toastr fun!');

      }
      , error => console.log(error)
    );
    this.router.navigate(['/management']);
  }

  deleteCategorie(categorie: Categorie) {
    const index = this.categories.indexOf(categorie);
    this.categories.splice(index, 1);

    this.serviceCategorie.deleteCategorie(categorie.id).subscribe(
      data => {
        console.log(data);
        this.toastr.success('La catégorie est supprimé!');
      },
        error => console.log(error)
    );
    this.router.navigate(['/management']);
  }

}