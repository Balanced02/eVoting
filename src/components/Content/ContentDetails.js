import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Tabs, Table, Icon, Card, Button } from "antd";
import AddCareer from "../../components/AddCareer";
import CareerList from "../../components/CareerList";
import { callApi } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import { Row, Col } from "antd";
import PageLoading from '../../components/PageLoading';
import { Document, Page } from 'react-pdf';


const TabPane = Tabs.TabPane;
const { Column } = Table

class ContentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentId: this.props.match.params.contentId,
      content:{
        contents: {},
        loading: true
      },
      numPages: null,
      pageNumber: 1,
      prevDisabled: true,
      nextDisabled: false
    };
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  nextPage(pageNum){
  const { pageNumber, numPages } = this.state
  if(pageNumber < numPages ){
    this.setState({
      pageNumber: pageNum + 1,
      nextDisabled: false,
      prevDisabled: false
    })
  }
  else{
    this.setState({ nextDisabled: true })
  }
    
  }

  prevPage(pageNum){
    const { pageNumber } = this.state
    if(pageNumber > 1){
    this.setState({
      pageNumber: pageNum - 1,
      prevDisabled: false,
      nextDisabled: false
    })  
    }
    else{
      this.setState({ prevDisabled: true })
    }
    
  }

    getSingleContent(){
        const { contentId } = this.state
      callApi(`/elearning/getSingleExtraCurriculum/${contentId}`)
      .then(response => {
        this.setState({
          content: {
            ...this.state.content,
            contents: response.data,
            loading: false
          }
        })
      })
      .catch(err => this.props.dispatch(showError('Unable to get content')))
    }
  
  componentDidMount() {
    this.getSingleContent()
  }
  render() {
    const { content, pageNumber, numPages, nextDisabled, prevDisabled } = this.state
    console.log(content)

    return (
      <div className="text-center">
        {content.loading ? (
            <PageLoading />
        ): (
            <div>
                {content.contents.category === 'ebooks' ? (
                          <Row>
                          <Col span={2}/>
                            <Col span={8} style={{textAlign: 'center' }}>
                              
                                 <Document
                                file={content.contents.content}
                                onLoadSuccess={this.onDocumentLoad}
                                
                                  >
                                <Page pageNumber={pageNumber} />
                              </Document>
                              <p>Page {pageNumber} of {numPages}</p>                  
                              <Button type="primary" disabled={prevDisabled} onClick={() => this.prevPage(pageNumber)} shape="circle" icon="left-circle" size='large' />
                              <Button type="primary" disabled={nextDisabled} onClick={() => this.nextPage(pageNumber)} shape="circle" icon="right-circle" size='large' />
                            </Col>
                          <Col span={2}/>
                          </Row>
                ): (
                    <div dangerouslySetInnerHTML={{__html: content.contents.content}}></div>
                )}
            </div>
        )}
      </div>
    );
  }
}

export default connect()(ContentDetails);
