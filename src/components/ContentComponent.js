import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  Label,
  Input,
} from "reactstrap";
import "./Styles/transition.css";



export default ({
  contentType,
  data,
  edit
}) => {
    let label =  contentType === 'video' ? 
    'Please Input Video URL':
    contentType === 'virtualReality' ?
    'Please enter the URL to the content':
    contentType === 'lesson' ?
    'Please upload Lesson Note':
    contentType == 'project' ?
    'Please enter the description of the project below':
    contentType === 'challenge' ?
    'Please enter the description of the challenge below':
    contentType === 'image' ?
    'Please upload your Image here':
    contentType === 'games' ?
    'Please enter the description of the game below':
    contentType === 'ebooks' ?
    'Please upload the e-book below':
    'Please enter the description of the quiz'
    
    let fileType = 
    contentType === 'video' ? 
    'text':
    contentType === 'virtualReality' ?
    'text':
    contentType === 'lesson' ?
    'textarea':
    contentType == 'project' ?
    'textarea':
    contentType === 'challenge' ?
    'textarea':
    contentType === 'image' ?
    'file':
    contentType === 'games' ?
    'textarea':
    contentType === 'ebooks' ?
    'file':
    'textarea'  


  return (
    <ReactCSSTransitionGroup 
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={true}
    transitionLeave={true}
    >
            <Label for="content">
              {label}
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              type={fileType}
              name="content"
              value={data.content}
              onChange={edit ? edit : ""}
            >
            </Input>
    
    </ReactCSSTransitionGroup>

  );
};

// {
//     name: 'Videos',
//     value: 'video'
// },
// {
//     name: 'Lessons',
//     value: 'lesson'
// },
// {
//     name: 'Project',
//     value: 'project'
// },
// {
//     name: 'Virtual Reality',
//     value: 'virtualReality'
// },
// {
//     name: 'Challenges',
//     value: 'challenge'
// },
// {
//     name: 'Images',
//     value: 'image'
// },
// {
//     name: 'Games',
//     value: 'games'
// },
// {
//     name: 'E-Books',
//     value: 'ebooks'
// },
// {
//     name: 'Quiz',
//     value: 'quiz'
// },