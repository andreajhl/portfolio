import React, {Component} from 'react';
import "./styles.scss";

class ShareContractLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.download = this.download.bind(this);
    }

    twitterMessage() {
        return "Acabo de recibir un video personalizado de " +
            (this.props.contract.celebrity ? this.props.contract.celebrity.full_name : "")
            +
            "&url="
            +  encodeURI(window.location.href) + "&via=contratafamosos"
    }

    mailMessage() {
        return "Acabo de recibir un video personalizado de " +
            (this.props.contract.celebrity ? this.props.contract.celebrity.full_name : "")
            + ", puedes verlo en el siguiente Link => " + encodeURI(window.location.href)
    }

    download() {
        window.open(this.props.contract.media, '_blank').focus();
    }

    render() {
        return (
            <div className="ShareContractLayout">
                <a href={"whatsapp://send?text=Me gustaría compartirte este video que acabo de recibir de *_" + (this.props.contract.celebrity ? this.props.contract.celebrity.full_name : "") +  "_* ==> " + encodeURI(window.location.href)}
                   data-action="share/whatsapp/share">
                    <img
                        alt="svg"
                        className="cursor-pointer"
                        src="/assets/img/whatsapp.svg"/>
                </a>
                <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(window.location.href)} target="_blank">
                    <img
                        alt="svg"
                        className="cursor-pointer"
                        src="/assets/img/facebook.svg"/>
                </a>
                <a href={"https://twitter.com/intent/tweet?text=" + this.twitterMessage()} target="_blank">
                    <img
                        alt="svg"
                        className="cursor-pointer"
                        src="/assets/img/twitter.svg"/>
                </a>
                <a href={"mailto:?subject=Me%20gustaría%20compartirte%20este%20video%20que%20compré%20en%20Famosos%2Ecom&body=" + this.mailMessage()}>
                    <img
                        alt="svg"
                        className="cursor-pointer"
                        src="/assets/img/email.svg"/>
                </a>
                <img
                    alt="svg"
                    className="cursor-pointer"
                    src="/assets/img/download.svg"
                    onClick={this.download}/>
            </div>
        );
    };

}

//defaultProps
ShareContractLayout.defaultProps = {
    contract: {}
};

export {ShareContractLayout};
