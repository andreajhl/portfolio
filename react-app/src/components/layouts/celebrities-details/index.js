import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ProfilePicture from '../../containers/profile-picture';
import CountryFlag from '../../containers/celebrity-country-flag';
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { ContractPriceLayout } from "../contract-price";
import CTA from "../../containers/cta-celebrity-profile";


class index extends Component {

       render() {
        console.log(this.props)
        return (
            <Container className='mx-auto'>
                <Row className='justify-content-md-center'>
                    <Col  xs="auto">
                    <ProfilePicture avatar={this.props.avatar}/>
                    </Col>    
                    <Col>
                        <h4 className='font-weight-bold'>Andres Cepeda</h4>
                        <CountryFlag countryCode={this.props.countryCode}></CountryFlag>
                        <span>{this.props.categoryTitle}</span>
                        <CelebrityFavoriteButton celebrityId={this.props.celebrityId}></CelebrityFavoriteButton>

                    <ContractPriceLayout
                           classes={"text-black font-weight-bold"}
                           price={200}
                           currency={'USD'}
                           rounding={true}
                        >
                        </ContractPriceLayout>
                        <CTA></CTA>
                             
                    </Col>
                
                   
                </Row>
            </Container>
        );
    }
}

export default index;
