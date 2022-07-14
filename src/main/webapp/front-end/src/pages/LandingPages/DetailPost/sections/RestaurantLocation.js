import React from 'react';
import KaKaoMap from './DetailMap';

const RestaurantLocation = ({restaurant}) => {
    return (
        <div>
             <KaKaoMap  searchPlace={restaurant}/>
        </div>
    );
};

export default RestaurantLocation;