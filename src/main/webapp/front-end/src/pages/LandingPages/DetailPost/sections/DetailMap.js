import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
const { kakao } = window


const KaKaoMap = ({searchPlace, restaurant_name}) => {
    
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
        displayMarker(data[i],i)
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        
        setPlaces(data)
      }
    }

    

    // 검색결과 목록 하단에 페이지 번호 표시

    function displayMarker(place, i) {

         let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
         })

      // kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name );
        // '<br><a href ="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query='+place.place_name+'>링크</a></div>');
        infowindow.open(map, marker)
      // })
    }

  
  }, [searchPlace])

    return (
        <div>
            <div
        id="myMap"
        style={{
          width: '450px',
          height: '500px',
        }}
      ></div>
            <div style={{"textAlign" : "center"}}>
                <button style={{"border" : 0, "outline" : 0, "color" : "blue","fontSize" : "15px", "backgroundColor" : "white"}} onClick={() => window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${restaurant_name}`, '_blank')}>[네이버 검색 링크]</button>
                </div>
        </div>
    );
};

export default KaKaoMap;