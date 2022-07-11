import React from 'react';
import KaKaoMap from './DetailMap';

const RestaurantLocation = ({restaurant, restaurant_name}) => {
    return (
        <div>
             <KaKaoMap  searchPlace={restaurant} restaurant_name = {restaurant_name}/>
        </div>
    );
};

export default RestaurantLocation;