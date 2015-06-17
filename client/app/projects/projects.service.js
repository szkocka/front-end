'use strict';

angular.module('researchApp')
  .service('projects', function () {
    // Tags
    this.tags = [
      {name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},{name: 'Tag 1', link: '/'},
      {name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},{name: 'Tag 2', link: '/'},
      {name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},{name: 'Tag 3', link: '/'},
      {name: 'Tag 4', link: '/'},{name: 'Tag 4', link: '/'},{name: 'Tag 4', link: '/'}
    ];

    // Projects
    this.projectsList = [
      {title: 'Project 1', link: '/', image: 'http://placekitten.com/340/200', description: 'Lorem ipsum dolor sit amet.'},
      {title: 'Project 2', link: '/', image: 'http://placekitten.com/340/200', description: 'Lorem ipsum dolor sit amet.'},
      {title: 'Project 3', link: '/', image: 'http://placekitten.com/340/200', description: 'Lorem ipsum dolor sit amet.'},
      {title: 'Project 4', link: '/', image: 'http://placekitten.com/340/200', description: 'Lorem ipsum dolor sit amet.'}
    ];
  });
