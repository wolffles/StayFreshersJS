import React from 'react';
import { Link } from 'react-router-dom';

const ProfileButtons = () => {
    return (
    <div className="btn-group h3" role="group">
        <Link to="/edit-profile" className="mint link">
            <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-deck" className="mint link">
            <i className="fab fa-black-tie text-info mr-1" />
            Add Deck
        </Link>
            {/* <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1" />
                Add Education
            </Link> */}
    </div>
    );
};

export default ProfileButtons;