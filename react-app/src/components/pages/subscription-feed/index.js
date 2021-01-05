import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import { PageContainer } from "../../layouts";
import MetaTags from "react-meta-tags";
import {CarouselAvailableSubscriptions, CelebrityFeedPosts} from '../../layouts';
import * as firestoreService from "../../../firebase/firestoreService";
const SubscriptionFeed = () => {
    const [posts, setPosts] = useState(false);
    const fetchPosts= async ()=> {
        const documents= await firestoreService.getDocuments('dev_posts');
        setPosts(documents);
        console.log(documents);
    }
    useEffect(() => {
        if(!posts){
            fetchPosts()
        }
        
    }, []);

    return (
      <Fragment>
        <MetaTags>
          <title>
            Famosos.com - Videos personalizados de tus famosos favoritos.
          </title>
          <meta
            name='description'
            content='Las ultimas publicaciones de tus famosos favoritos.'
          />
        </MetaTags>
        <PageContainer>
          <Container>
            <Row>
              <Col md='9' className='mx-auto'>
                <CarouselAvailableSubscriptions />
                <CelebrityFeedPosts posts={posts}/>
                
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </Fragment>
    );
}

const _SubscriptionFeed = connect(null, null)(SubscriptionFeed);
export { _SubscriptionFeed as SubscriptionFeed };

