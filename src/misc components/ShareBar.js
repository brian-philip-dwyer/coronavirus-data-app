import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import { Container, Row } from "react-bootstrap-grid-component";


class ShareBar extends React.Component {

    render() {
        return (
            <div className="Demo__container">
                <Container className="share-bar">
                    <Row>
                        <div className="social-media-button">
                            <FacebookShareButton
                                url={this.props.shareUrl}
                                quote={this.props.title}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </div>

                        <div className="social-media-button">
                            <TwitterShareButton
                                url={this.props.shareUrl}
                                title={this.props.title}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>

                        <div className="social-media-button">
                            <LinkedinShareButton url={this.props.shareUrl}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                        </div>

                        <div className="social-media-button">
                            <RedditShareButton
                                url={this.props.shareUrl}
                                title={this.props.title}
                                windowWidth={660}
                                windowHeight={460}
                            >
                                <RedditIcon size={32} round />
                            </RedditShareButton>
                        </div>

                        <div className="social-media-button">
                            <EmailShareButton
                                url={this.props.shareUrl}
                                subject={this.props.title}
                                body="body"
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                        </div>
                    </Row>
                </Container>
            </div>

        );
    }


}

export default ShareBar;