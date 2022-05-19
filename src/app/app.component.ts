import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-bootstrap-examples';
  products: any = []; // tambahkan baris ini sebagai variabel yang akan menampung data JSON
  _modalService: any;
  formData: any;
  private _formBuilder: any;
  formSunting: any;

    // tambahkan dari sini
    constructor(private httpClient: HttpClient) {
        this.httpClient.get("assets/mentor.json").subscribe(data =>{
            console.log(data);
            this.products =data;
        })
      }
      openModal(content) {
        this._modalService.open(content);
      }
    
      ngOnInit() {
        this.formData = this._formBuilder.group({
          _id: this._formBuilder.control(null),
          civility: this._formBuilder.control(null),
          first_name: this._formBuilder.control(null),
          last_name: this._formBuilder.control(null),
          company.name: this._formBuilder.control(null),
          company.user_type: this._formBuilder.control(null),
          aktif: this._formBuilder.control(null)
        });
        
        this.formSunting = this._formBuilder.group({
          _id: this._formBuilder.control(null),
          civility: this._formBuilder.control(null),
          first_name: this._formBuilder.control(null),
          last_name: this._formBuilder.control(null),
          company.name: this._formBuilder.control(null),
          company.user_type: this._formBuilder.control(null),
          aktif: this._formBuilder.control(null)
          konfirmasi: this._formBuilder.control(null)
        });
      }
    
      ngAfterViewInit(): void {
        if (this.idData != 0) {
          this._service.findById(this.idData).subscribe((response: any) => {
            if (response.status === 200) {
              this.formData.setValue(response.body);
              this.formChangePassword.patchValue({
                id: this.idData
              });
            }
          }, respError => {
            if (respError.status === 404) {
              Swal.fire(respError.error.message);
              this._router.navigate(['/', 'user-management', 'pengguna']);
            } else {
              Swal.fire('Terjadi Kesalahan Server');
            }
          });
        }
      }
    
      simpanAlert() {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: 'Anda Yakin',
          text: 'Simpan Data?',
          type: 'error',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            if (this.formData.invalid){
              Swal.fire('Ada data yang belum diisi');
            } else {
              const value: PenggunaDataModel = this.formData.value;
              this._service.save(value).subscribe((response: any) => {
                if (response.status === 200) {
                  Swal.fire('Data Berhasil Disimpan');
                  this._router.navigate(['/', 'user-management', 'pengguna']);
                }
              }, respError => {
                if (respError.status === 404) {
                  Swal.fire(respError.error.message);
                } else {
                  Swal.fire('Terjadi Kesalahan Server');
                }
              });
            }
          }
        });
}
