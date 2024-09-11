import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null; // Variable to store the image preview URL
  maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
  allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  constructor(private http: HttpClient, private router: Router) {}

  onSelect(event: { addedFiles: any[] }) {
    const file = event.addedFiles[0];

    // Validate MIME type
    if (!this.allowedMimeTypes.includes(file.type)) {
      alert(
        'Invalid file format! Please select an image with png, jpg, or jpeg format.'
      );
      return;
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      alert('File is too large! The maximum file size allowed is 5MB.');
      return;
    }

    // If validation passes, set the selected file
    this.selectedFile = file;

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file); // Read the file to get the base64 string
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('No image selected!');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post('https://image-uploader-backend-ebon.vercel.app/posts', formData)
      .subscribe(
        (res) => {
          alert('Image uploaded successfully!');
          // Handle success (optional: refresh image gallery or navigate)
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Error uploading image!');
        }
      );
  }
}
