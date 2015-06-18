'use strict';

angular.module('researchApp')
  .service('data', function () {
    this.tags = [
      {name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},
      {name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},
      {name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},
      {name: 'Tag 4', link: '/'},{name: 'Tag 4', link: '/'},{name: 'Tag 4', link: '/'}
    ];

    this.projectsList = [
      {id: '1', title: 'Project 1', link: '/', image: 'http://placekitten.com/1201/500', description: 'Lorem ipsum dolor sit amet.'},
      {id: '2', title: 'Project 2', link: '/', image: 'http://placekitten.com/1202/500', description: 'Lorem ipsum dolor sit amet.'},
      {id: '3', title: 'Project 3', link: '/', image: 'http://placekitten.com/1210/500', description: 'Lorem ipsum dolor sit amet.'},
      {id: '4', title: 'Project 4', link: '/', image: 'http://placekitten.com/1206/500', description: 'Lorem ipsum dolor sit amet.'}
    ];
  });
