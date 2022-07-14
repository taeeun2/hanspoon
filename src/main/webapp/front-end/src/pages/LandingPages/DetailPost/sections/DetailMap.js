import React, { useEffect, useState } from 'react'
import "assets/css/detailPost.css"
const { kakao } = window


const KaKaoMap = ({searchPlace}) => {
    
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
     
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
      var content =  '<div class="customoverlay">' +
      '    <span class="title">'+
      place.place_name +
      '</span>' +
      '</div>';

      
      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(place.y, place.x),
          content: content   
      });
      
      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
         let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
         })

      // kakao.maps.event.addListener(marker, 'click', function () {
        // infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name +'</div>');
       
       
        // infowindow.setContent( '<div class="customoverlay">' +
        // '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        // '    <span class="title">구의야구공원</span>' +
        // '  </a>' +
        // '</div>')

        // infowindow.open(map, marker)
      // })
    }

  
  }, [])

    return (
        <div>
            <div
        id="myMap"
        style={{
          width: '450px',
          height: '450px',
        }}
      ></div>
            
        </div>
    );
};

export default KaKaoMap;