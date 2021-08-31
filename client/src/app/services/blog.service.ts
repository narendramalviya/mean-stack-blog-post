import { Injectable } from '@angular/core';
import  {Post}  from '../models/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  // createPost(post: Post) {
  //   const postData = JSON.parse(JSON.stringify(post));
  //   return this.db.collection('blogs').add(postData);
  // }

  getAllPosts(): Observable<any> {

    // const blogs = this.db.collection<Post>('blogs', ref => ref.orderBy('createdDate', 'desc')).snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(
    //       c => ({
    //         postId: c.payload.doc['id'],
    //         ...c.payload.doc.data()
    //       }));
    //   }));

    return this.http.get<any>(`${environment.apiUrl}/api/posts`);

  }

  getPostbyId(id: string): Observable<Post> {
    return this.http.get<any>(`${environment.apiUrl}/api/post/${id}`);
  }

  updatePost(postId: string, post: Post) {
    const putData = JSON.parse(JSON.stringify(post));
    // return this..http.doc('blogs/' + postId).update(putData);
  return this.http.get<any>(`${environment.apiUrl}/api/post/`);
  }

  deletePost(postId: string) {
    // return this..http.doc('blogs/' + postId).delete();
     return this.http.get<any>(`${environment.apiUrl}/api/post/`);
  }
}
