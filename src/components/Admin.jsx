import React from 'react';

import { db, storage, timestamp } from '../firebase';
import About from './About';
import Display from './Display';
import DisplayAbout from './DisplayAbout';
import Form from './Form';
import Header from './Header';
import Upload from './Upload';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      title: '',
      from: '',
      completed: 0,
      fileSrc: null,
      uploadedUrl: '',
      image: null,
      posted: false,
      signleView: true,
      lastPosts: [],
      postView: true,
      about: '',
      lastAbout: [],
      lastAboutShowing: true,
    };
  }

  componentDidMount() {
    this.getLast();
    this.getAbout();
  }

  userAdmin = bool => {
    this.setState({ isAdmin: bool });
  };

  handleChangeImg = e => {
    const file = e.target.files[0];
    const { postView } = this.state;
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        console.log('good image type');
        this.setState({
          fileSrc: URL.createObjectURL(file),
          image: file,
          lastAboutShowing: postView,
        });
      } else {
        console.log('bad image type');
      }
    }
  };

  handleUpload = () => {
    const { image, postView } = this.state;
    if (image) {
      const uploadTask = storage
        .ref(`${postView ? 'images/' : 'profile/'}${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ completed: progress < 90 ? progress : 90 });
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref(postView ? 'images' : 'profile')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.setState({ uploadedUrl: url });
              this.createPost();
            });
        }
      );
    } else if (!postView) {
      this.createPost();
    } else {
      console.log('Error please choose an image to upload');
    }
  };

  getAbout = () => {
    const about = {};
    db.collection('about')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          about.about = doc.data().about;
          about.fileSrc = doc.data().img;
        });
        this.setState({ lastAbout: about });
      });
  };

  getLast = () => {
    const items = [];
    db.collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          items.push({
            title: doc.data().title,
            from: doc.data().city,
            fileSrc: doc.data().img,
          });
        });
        this.setState({ lastPosts: items });
      });
  };

  handleChangeInput = e => {
    let change = true;
    if (e.target.name === 'about' && e.target.value !== '') {
      change = false;
    }
    this.setState({
      [e.target.name]: e.target.value,
      lastAboutShowing: change,
    });
  };

  updateAbout = () => {
    const { about, uploadedUrl } = this.state;
    console.log('uploadedUrl......', uploadedUrl);
    return db
      .collection('about')
      .doc('C1zoKBIJeoxRKmCXhJDs')
      .update(
        uploadedUrl && about
          ? {
              about,
              uploadedUrl,
            }
          : uploadedUrl
          ? { uploadedUrl }
          : { about }
      )
      .then(() => {
        this.setState({ posted: true });
        this.setState({ completed: 100 });
      });
  };

  createPost = () => {
    const { uploadedUrl, title, from } = this.state;

    return db
      .collection('posts')
      .add({
        title,
        city: from,
        img: uploadedUrl,
        created: timestamp,
      })
      .then(() => {
        this.setState({ posted: true });
        this.setState({ completed: 100 });
      });
  };

  handleView = () => {
    const { signleView } = this.state;
    this.setState({ signleView: !signleView });
  };

  handlePostView = () => {
    const { postView } = this.state;
    this.setState({ postView: !postView, fileSrc: null, image: null });
  };

  toggleAbout = () => {
    const { lastAboutShowing } = this.state;
    this.setState({ lastAboutShowing: !lastAboutShowing });
  };

  render() {
    const {
      isAdmin,
      completed,
      posted,
      fileSrc,
      title,
      from,
      signleView,
      lastPosts,
      postView,
      about,
      lastAbout,
      lastAboutShowing,
    } = this.state;
    return (
      <div>
        <Header
          handlePostView={this.handlePostView}
          isAdmin
          postView={postView}
        />

        {isAdmin ? <Form userAdmin={this.userAdmin} /> : null}
        {!isAdmin ? (
          <div className="admin-container">
            <div className="admin-container__left">
              <h2>{postView ? 'EDIT POST' : 'EDIT ABOUT'}</h2>
              {postView ? (
                <Upload
                  handleChangeImg={this.handleChangeImg}
                  handleChangeInput={this.handleChangeInput}
                />
              ) : (
                <About
                  handleChangeImg={this.handleChangeImg}
                  handleChangeInput={this.handleChangeInput}
                />
              )}
            </div>
            <div className="admin-container__right">
              {postView ? (
                <Display
                  actualPost={{ fileSrc, from, title }}
                  completed={completed}
                  handleUpload={this.handleUpload}
                  handleView={this.handleView}
                  lastPosts={lastPosts}
                  posted={posted}
                  signleView={signleView}
                />
              ) : (
                <DisplayAbout
                  about={about}
                  fileSrc={fileSrc}
                  handleUpload={this.updateAbout}
                  lastAbout={lastAbout}
                  lastAboutShowing={lastAboutShowing}
                  toggleAbout={this.toggleAbout}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Admin;
