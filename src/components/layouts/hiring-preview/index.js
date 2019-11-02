import React, {Component} from 'react';
import "./styles.scss";

class HiringPreviewLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoDesktopPlayIcon: "fa-play",
            showVideo: false
        };

        this.playDesktopVideo = this.playDesktopVideo.bind(this);
        this.videoDesktopRef = React.createRef();
    }

    componentDidMount(): void {
        this.initSetTimeOut();
    }

    shareWithWhatsApp() {

    }

    shareWithFacebook() {

    }

    shareWithInstagram() {

    }

    shareWithDownload() {

    }

    playDesktopVideo() {
        if (this.videoDesktopRef.current.paused) {
            this.setState({videoDesktopPlayIcon: "fa-pause"}, () => {
                this.videoDesktopRef.current.play()
            });
        } else {
            this.setState({videoDesktopPlayIcon: "fa-play"}, () => {
                this.videoDesktopRef.current.pause()
            });
        }
    }

    initSetTimeOut() {
        setTimeout(() => {
            this.setState({showVideo: true})
        }, 3000)
    }

    render() {

        return (
            <div className="HiringPreviewLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12 col-lg-11">
                        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
                            <div className="row section m-0 p-0">
                                <div className="col-12 text-center">
                                    <h4 className="mt-3 font-weight-bold pb-4 mb-4">
                                        {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : null}
                                    </h4>
                                </div>
                                <div className="preview">
                                    <div className="row m-0 p-0">
                                        <div className="col-sm-12 col-md-6 col-lg-5 text-center">
                                            <div className="video-container">
                                                <div
                                                    className={"f-video " + (!this.state.showVideo ? "video-loading" : "")}>
                                                <span
                                                    className="spinner-border"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                    <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                                                       onClick={this.playDesktopVideo.bind(this)}
                                                    />
                                                    <video src={this.props.contract.media}
                                                           ref={this.videoDesktopRef}
                                                           controls={false}
                                                           onClick={this.playDesktopVideo.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-7 p-2">
                                            <div className="video-details">
                                                <div className="share-div">
                                                    <img className="cursor-pointer" src="/assets/img/whatsapp.svg"
                                                         onClick={this.shareWithWhatsApp}/>
                                                    <img className="cursor-pointer" src="/assets/img/facebook.svg"
                                                         onClick={this.shareWithFacebook}/>
                                                    <img className="cursor-pointer" src="/assets/img/instagram.svg"
                                                         onClick={this.shareWithInstagram}/>
                                                    <img className="cursor-pointer" src="/assets/img/download.svg"
                                                         onClick={this.shareWithDownload}/>
                                                </div>
                                                <div className="titles">
                                                    <h5 className="font-weight-bold">
                                                        Para:
                                                    </h5>
                                                    <h5>{this.props.contract.delivery_to ? this.props.contract.delivery_to : "----"}</h5>
                                                    <hr/>
                                                    <h5 className="font-weight-bold">
                                                        De:
                                                    </h5>
                                                    <h5>{this.props.contract.delivery_from ? this.props.contract.delivery_from : "----"}</h5>
                                                    <hr/>
                                                    <h5 className="font-weight-bold">
                                                        Instrucciones
                                                    </h5>
                                                    <div className="instructions text-justify">
                                                        <h5>Lorem Ipsum es simplemente el texto de relleno de las
                                                            imprentas y archivos de texto. Lorem Ipsum ha sido el
                                                            texto de relleno estándar de las industrias desde el año
                                                            1500, cuando un impresor (N. del T. persona que se
                                                            dedica a la imprenta) desconocido usó una galería de
                                                            textos y los mezcló de tal manera que logró hacer un
                                                            libro de textos especimen. No sólo sobrevivió 500 años,
                                                            sino que tambien ingresó como texto de relleno en
                                                            documentos electrónicos, quedando esencialmente igual al
                                                            original. Fue popularizado en los 60s con la creación de
                                                            las hojas "Letraset", las cuales contenian pasajes de
                                                            Lorem Ipsum, y más recientemente con software de
                                                            autoedición, como por ejemplo Aldus PageMaker, el cual
                                                            incluye versiones de Lorem Ipsum.
                                                            {this.props.contract.instructions ? this.props.contract.instructions : "----"}</h5>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className="video-details">
                                                <h5 className="font-weight-bold">Enviale un comentario
                                                    a {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : null}</h5>
                                                <div className="mt-2">
                                                    <textarea className="form-control" autoFocus={true}>
                                                    </textarea>
                                                    <button className="btn btn-sm btn-primary mt-2">Enviar comentario
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

//default props
HiringPreviewLayout.defaultProps = {
    contract: []
};

export {HiringPreviewLayout};
