import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import { Tabs, Table, Icon } from "antd";
import AddCareer from "../../components/AddCareer";
import CareerList from "../../components/CareerList";
import { callApi } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import { Modal, Row, Col } from "antd";
import { Card, CardTitle, CardText, CardImg, Button, CardImgOverlay } from 'reactstrap';
import PageLoading from '../../components/PageLoading';

const TabPane = Tabs.TabPane;
const { Column } = Table

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.match.params.catId,
      contentType: this.props.match.params.contentType,
      content:{
        contents: [],
        loading: true
      },
    };
  }

    getContent(){
        const { category, contentType } = this.state
      callApi(`/elearning/${contentType}/${category}`)
      .then(response => {
        this.setState({
          content: {
            ...this.state.content,
            contents: response.data,
            loading: false
          }
        })
      })
    }
  
  componentDidMount() {
    this.getContent()
  }
  render() {
    const { content } = this.state
    console.log(content)
    const columns = [
        {title: 'Category', dataIndex: 'category', key: 'category'},
        {title: 'Age', dataIndex: 'age', key: 'age'},
        {title: 'Class', dataIndex: 'class', key: 'class'},
        {title: 'Discipline', dataIndex: 'discipline', key: 'skill'},

    ]

    const data = !content.loading ? (
        content.contents.map((cont, i) => {
            return {
                key: i+1,
                category: cont.category,
                age: cont.age,
                class: cont.class,
                content: cont.content,
                discipline: cont.discipline,
                id: cont._id
            }
        })
    ):('')
    return (
      <div className="text-center">
          <h2>List of Content</h2>
          {content.loading ? (
            <PageLoading />
            ):(
            <div className="text-center">
            {content.contents.length > 0 && !content.loading ? (
            <div className="text-center">
                <Table
                columns={columns}
                dataSource={data}
                expandedRowRender={record => {
                return record.category !== 'ebooks'   ? 
                  (
                    <div dangerouslySetInnerHTML={{__html: record.content}}></div>
                  ):(
                    <div>                        
                       <Link to={`/content/${record.id}`}>Read this ebook<Icon type="right-circle-o" /></Link>
                       {' '}or <a href={record.content} target="_blank">Download this book</a>                         
                    </div>
                  )
                } 
              }
              />
          </div>
              ): (
              <Row>
              <h2>No contents yet</h2>
              </Row>
              )}
            
         </div>
            )}

          
      </div>
    );
  }
}

export default connect()(ContentList);
