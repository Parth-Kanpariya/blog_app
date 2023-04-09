import React from 'react';
import BlogCard from './BlogCard';
import Blog from './Blog';

import { replace } from 'lodash';

const Blogs = [
  {
    id: 1,
    title: 'My Blog1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper nunc eget mauris fermentum, quis lacinia enim commodo. Donec ut vestibulum massa. Vestibulum ut ipsum eget mi malesuada consequat. Suspendisse euismod lectus et convallis tristique. In hac habitasse platea dictumst. Etiam nec sapien tellus. Proin vitae aliquam urna. Sed at pulvinar arcu. Sed bibendum eget justo sit amet viverra. Nulla suscipit faucibus quam, vel vestibulum nunc mattis at. Nam eget turpis mi. Sed maximus vitae nibh ac interdum. Nunc consequat odio sapien, in lacinia enim tempor at. Vivamus hendrerit bibendum arcu ac vehicula. Vivamus laoreet nisi vitae arcu porttitor, in auctor lacus aliquet.,',
    username: 'Jis me hain',
    photo: ''
  },
  {
    id: 2,
    title: 'My Blog2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper nunc eget mauris fermentum, quis lacinia enim commodo. Donec ut vestibulum massa. Vestibulum ut ipsum eget mi malesuada consequat. Suspendisse euismod lectus et convallis tristique. In hac habitasse platea dictumst. Etiam nec sapien tellus. Proin vitae aliquam urna. Sed at pulvinar arcu. Sed bibendum eget justo sit amet viverra. Nulla suscipit faucibus quam, vel vestibulum nunc mattis at. Nam eget turpis mi. Sed maximus vitae nibh ac interdum. Nunc consequat odio sapien, in lacinia enim tempor at. Vivamus hendrerit bibendum arcu ac vehicula. Vivamus laoreet nisi vitae arcu porttitor, in auctor lacus aliquet.',
    username: 'Dum to faqt',
    photo: ''
  },
  {
    id: 3,
    title: 'My Blog3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper nunc eget mauris fermentum, quis lacinia enim commodo. Donec ut vestibulum massa. Vestibulum ut ipsum eget mi malesuada consequat. Suspendisse euismod lectus et convallis tristique. In hac habitasse platea dictumst. Etiam nec sapien tellus. Proin vitae aliquam urna. Sed at pulvinar arcu. Sed bibendum eget justo sit amet viverra. Nulla suscipit faucibus quam, vel vestibulum nunc mattis at. Nam eget turpis mi. Sed maximus vitae nibh ac interdum. Nunc consequat odio sapien, in lacinia enim tempor at. Vivamus hendrerit bibendum arcu ac vehicula. Vivamus laoreet nisi vitae arcu porttitor, in auctor lacus aliquet.',
    username: 'bajirao',
    photo: ''
  },
  {
    id: 4,
    title: 'My Blog4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper nunc eget mauris fermentum, quis lacinia enim commodo. Donec ut vestibulum massa. Vestibulum ut ipsum eget mi malesuada consequat. Suspendisse euismod lectus et convallis tristique. In hac habitasse platea dictumst. Etiam nec sapien tellus. Proin vitae aliquam urna. Sed at pulvinar arcu. Sed bibendum eget justo sit amet viverra. Nulla suscipit faucibus quam, vel vestibulum nunc mattis at. Nam eget turpis mi. Sed maximus vitae nibh ac interdum. Nunc consequat odio sapien, in lacinia enim tempor at. Vivamus hendrerit bibendum arcu ac vehicula. Vivamus laoreet nisi vitae arcu porttitor, in auctor lacus aliquet.',
    username: 'singham',
    photo: ''
  }
];

function BlogList() {
  return (
    <div>
      {' '}
      {Blogs.map((blog) => (
        <BlogCard blog={blog} />
      ))}{' '}
    </div>
  );
}

export default BlogList;
