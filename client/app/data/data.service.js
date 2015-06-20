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
      {
        id: '1',
        title: 'Project 1',
        image: 'http://placekitten.com/1201/500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui error velit tempora voluptas, impedit repellat explicabo quisquam aut  officia eos quas porro eum culpa quibusdam! Consequatur laboriosam, saepe eos perferendis, nemo voluptates provident!',
        participants: [
          {name: 'User1', email: 'user1@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User2', email: 'user2@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User3', email: 'user3@user.com', avatar: 'http://placekitten.com/0150/0150'}
        ]
      },
      {
        id: '2',
        title: 'Project 2',
        image: 'http://placekitten.com/1202/500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui error velit tempora voluptas, impedit repellat explicabo quisquam aut  officia eos quas porro eum culpa quibusdam! Consequatur laboriosam, saepe eos perferendis, nemo voluptates provident!',
        participants: [
          {name: 'User1', email: 'user1@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User2', email: 'user2@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User3', email: 'user3@user.com', avatar: 'http://placekitten.com/0150/0150'}
        ]
      },
      {
        id: '3',
        title: 'Project 3',
        image: 'http://placekitten.com/1210/500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui error velit tempora voluptas, impedit repellat explicabo quisquam aut officia eos quas porro eum culpa quibusdam! Consequatur laboriosam, saepe eos perferendis, nemo voluptates provident!',
        participants: [
          {name: 'User1', email: 'user1@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User2', email: 'user2@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User3', email: 'user3@user.com', avatar: 'http://placekitten.com/0150/0150'}
        ]
      },
      {
        id: '4',
        title: 'Project 4',
        image: 'http://placekitten.com/1206/500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui error velit tempora voluptas, impedit repellat explicabo quisquam aut  officia eos quas porro eum culpa quibusdam! Consequatur laboriosam, saepe eos perferendis, nemo voluptates provident!',
        participants: [
          {name: 'User1', email: 'user1@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User2', email: 'user2@user.com', avatar: 'http://placekitten.com/0150/0150'},
          {name: 'User3', email: 'user3@user.com', avatar: 'http://placekitten.com/0150/0150'}
        ]
      }
    ];
  });
