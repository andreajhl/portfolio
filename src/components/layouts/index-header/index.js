import React, {Component} from 'react';
import "./styles.scss";

class IndexHeaderLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showHeader: true
        };

        this.hideHeader = this.hideHeader.bind(this);

        setTimeout(() => {
            try {
                // Detect when scrolled to bottom.
                document.getElementsByClassName("scroll-section")[0].addEventListener("scroll", () => {
                    this.hideHeader()
                });
            }
            catch (e) {
                console.log("scroll-section doesn't allowed")
            }
        }, 1000)
    }

    hideHeader() {
        localStorage.setItem("hideIndexHeader", "true");
        this.setState({showHeader: false})
    }

    render() {
        return (
            <>
                {
                    this.state.showHeader === true
                        ?
                        <div className="IndexHeaderLayout">
                            <div className="f-items d-none d-md-none d-lg-block">
                                <div className="header">
                                    <div className="text-center p-4 index-header">
                                        <i className="fa fa-times-circle fa-2x text-white" onClick={this.hideHeader}/>
                                        <img width="150px" src="/assets/img/demo.svg" alt="avatar"/>
                                        <div className="mt-4 mb-4 text-white">
                                            <h6 className="font-weight-bold">Conecta con famosos para que graben <br/>videos
                                                personalizados con tus mensajes</h6>
                                            <small className="mt-2">
                                                Regalos de Cumpleaños, Invitaciones a Eventos, Declaraciones de Amor
                                            </small>
                                            <br className="m-0 p-0"/>
                                            <small>
                                                Mensajes Corporativos, Contenidos Para Redes Sociales y Muchos Más!
                                            </small>
                                        </div>
                                        <div onClick={this.hideHeader} style={{cursor: "pointer"}}>
                                            <h6 className="mt-4 pt-4 font-weight-bold text-white">
                                                Ver Famosos
                                            </h6>
                                            <img width="20px" className="mt-0 pt-0" src="/assets/img/circle-down.svg"
                                                 alt="avatar"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="f-items d-block d-md-block d-lg-none">
                                <div className="sm-header">
                                    <i className="fa fa-times-circle fa-2x text-white" onClick={this.hideHeader}/>
                                    <div className="f-video">
                                        <video
                                            src={"https://firebasestorage.googleapis.com/v0/b/famosos-27f08.appspot.com/o/famosos%2Findex-banner-video.mp4?alt=media&token=97303a12-a5bc-4171-87fa-713dbb7196aa"}
                                            controls={false}
                                            autoPlay
                                            playsInline={true}
                                            loop={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </>
        );
    };

}

export {IndexHeaderLayout};
