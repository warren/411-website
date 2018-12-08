import * as React from 'react';
import styled from 'react-emotion';


const ThePic = styled('span')`
    color: #fff;
    float: right;
`;

class ProfilePic extends React.Component<{}> {
    public render() {
        return(
            <ThePic>(pro pic)</ThePic>
        );
    }
}

export default ProfilePic;