import 'whatwg-fetch';
import { jwtConfig } from '../config';
import upload from 'superagent';
import Form from 'antd';
import uuid from 'uuid/v4';

export const callApi = (url, data, method) => {
  console.log('Calling API... ' + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || 'GET',
      mode: 'cors',
      redirect: 'follow',
      compress: true,
      credentials: 'include',
    };
    if (method === 'POST') {
      options.body = JSON.stringify(data);
      options.headers = {};
      options.headers.Accept = 'application/json';
      options.headers['Content-Type'] = 'application/json';
    }
    fetch(`${jwtConfig.fetchUrl}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        reject(err);
      });
  });
};

export const imageUpload = (url, data, method) => {
  let photo = new FormData();
  photo.append('file', data);
  photo.append('name', uuid());
  console.log('Calling API... ' + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include',
    };
    if (method === 'POST') {
      options.body = photo;
    }
    fetch(`${jwtConfig.fetchUrl}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const picUpload = async (file, folder) => {
  return new Promise(async (resolve, reject) => {
    let imageUrl = await imageUpload('/uploadFile', file, 'POST');
    if (imageUrl.file.hasOwnProperty('url')) {
      resolve(imageUrl.file.url);
    } else {
      reject(new Error('Unable to resolve url'));
    }
  });
};
