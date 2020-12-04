import React, { Component, Fragment,useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { PageContainer } from '../../layouts';
// import './styles.scss';
import {Container,Row, Col, Button} from 'react-bootstrap';
import {Redirect, withRouter} from 'react-router-dom';

import BlogPost from '../../containers/blog-post-full';
import MetaTags from "react-meta-tags";
import * as mediumApiService from "../../../state/utils/mediumApiService";
import { blogOperations } from "../../../state/ducks/blog";


const Blog_entry = ({blogsData,match,history}) => {
    let redirect;
    let blog;
    
    if (typeof(blogsData[match.params.id]) === 'undefined') {
      redirect = <Redirect to='/blog'></Redirect>;
    }
    else{
        blog= (<BlogPost
        title={blogsData[match.params.id].title}
        thumbnail={blogsData[match.params.id].thumbnail}
        description={blogsData[match.params.id].description}
        pubDate={blogsData[match.params.id].pubDate}
        />)
    }
    return (
      <Fragment>
        {redirect}
        <MetaTags>
          <title>Famosos Blog</title>
          <meta name='description' content='Agregar descripcion' />
        </MetaTags>
        <PageContainer>
          <Container>
            <Row>
                <Button onClick={()=> history.push('/blog')}>👈 Ver mas blogs</Button>
            </Row>
            <Row>
              <Col className='mx-auto' md='8'>{blog}</Col>
            </Row>
          </Container>
        </PageContainer>
      </Fragment>
    );
}

// mapStateToProps
const mapStateToProps = ({ blog }) => ({
  blogsData: blog.blogsPostMediumReducer.data,
});

const _Blog = withRouter(connect(mapStateToProps)(Blog_entry));
export { _Blog as Blog_Entry };
