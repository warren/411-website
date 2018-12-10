import * as React from 'react';
import styled from 'react-emotion';

type ProfilePicProps = {
    proPicURL: string;
}

const ThePic = styled('img')`
    color: #fff;
    float: right;
    border-radius: 5px;
`;

class ProfilePic extends React.Component<ProfilePicProps> {
    public render() {
        return(
          <ThePic src={this.props.proPicURL} />
        );
    }
}

export default ProfilePic;