import React from 'react'
import { connect } from 'react-redux'
import PlayLessonQuestion from './question.jsx'

import {loadData, nextQuestion, submitResponse, updateName} from '../../actions.js'
import _ from 'underscore'
import {hashToCollection} from '../../libs/hashToCollection'
import Register from './register.jsx'
import Finished from './finished.jsx'

const Lesson = React.createClass({
  componentWillMount: function () {
    // var data = require('../../libs/femaleTeacher.test.data').default
    // this.setState({question: data,
    //                feedback: undefined,
    //                correct: undefined
    //              })
    // const action = loadData('classroom.data')
    // this.props.dispatch(action);
    // const next = nextQuestion();
    // this.props.dispatch(next);
  },

  submitResponse: function(response) {
    const action = submitResponse(response);
    this.props.dispatch(action)
  },

  renderQuestionComponent: function () {
    if (this.props.question.currentQuestion) {
      return (<Question
                question={this.props.question.currentQuestion}
                submitResponse={this.submitResponse}/>)
    }
  },

  questionsForLesson: function () {
    var questionsCollection = hashToCollection(this.props.questions.data)
    const {data} = this.props.lessons, {lessonID} = this.props.params;
    return data[lessonID].questions.map((id) => {
      return _.find(questionsCollection, {key: id})
    })
  },

  startActivity: function (name) {
    this.saveStudentName(name);
    const action = loadData(this.questionsForLesson())
    this.props.dispatch(action);
    const next = nextQuestion();
    this.props.dispatch(next);
  },

  nextQuestion: function () {
    const next = nextQuestion();
    this.props.dispatch(next);
  },

  getLesson: function () {
    return this.props.lessons.data[this.props.params.lessonID]
  },

  getLessonName: function () {
    return this.props.lessons.data[this.props.params.lessonID].name
  },

  saveStudentName: function (name) {
    this.props.dispatch(updateName(name))
    console.log("Starting activity: ", name);
  },

  render: function () {
    const {data} = this.props.lessons, {lessonID} = this.props.params;
    if (data[lessonID]) {
      if (this.props.playLesson.currentQuestion) {
        return (
          <PlayLessonQuestion question={this.props.playLesson.currentQuestion} nextQuestion={this.nextQuestion}/>
        )
      }
      else if (this.props.playLesson.answeredQuestions.length > 0 && (this.props.playLesson.unansweredQuestions.length === 0 && this.props.playLesson.currentQuestion === undefined )) {
        return (<Finished data={this.props.playLesson} lessonID={this.props.params.lessonID}/>)
      }
      else {
        return (
          <Register lesson={this.getLesson()} startActivity={this.startActivity}/>
        )
      }
    }
    else {
      return (<p>Loading...</p>)
    }
  }
})

function select(state) {
  return {
    lessons: state.lessons,
    questions: state.questions,
    playLesson: state.playLesson,
    routing: state.routing
  }
}

export default connect(select)(Lesson)