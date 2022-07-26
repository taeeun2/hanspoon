import { Grid } from '@mui/material'
import select from 'assets/theme/components/form/select'
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import React, { useEffect, useState } from 'react'
import PlaceList from './PlaceList'

const { kakao } = window

const MapContainer = ({ searchPlace, searchRestaurant, setOnText}) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  const [lat, setLat] = useState(37.5794251)
  const [lng, setLng] = useState(126.889747)
  // const [distanceOverlay, setDistanceOverlay] = []
  var markers = [];
 

  // 선택된 식당 이름 가져오기
  const setPlaceName = (name) => {
    setOnText(name)
    searchRestaurant(name)
  }

  const setPlaceAddress = (address) => {
    localStorage.setItem('restaurant_address', address)
  }
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var distanceOverlay = new kakao.maps.CustomOverlay({
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3  
    });
    // var polyline = new kakao.maps.Polyline({
    //   strokeWeight: 2,
    //   strokeColor: '#ff0000 ',
    //   strokeOpacity: 0.8,
    //   strokeStyle: 'solid'
    // });
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
      // draggable: false
    }
    const map = new kakao.maps.Map(container, options)
     //누리꿈 스퀘어 표시
     displayNurikkum()

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var bounds = new kakao.maps.LatLngBounds()


        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i],i)
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
       
        map.setBounds(bounds)
        
        setPlaces(data)
      }
    }

    function displayNurikkum() {
      var content =  '<div class="customoverlay">' +
      '    <span class="title">'+
      '누리꿈스퀘어' +
      '</span>' +
      '</div>';

      let marker2 = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),

      })

      markers.push(marker2)

      // marker2.setMap(map);  
      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(lat, lng),
          content: content   
      });
      
      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
        

  
    }
    

    // 검색결과 목록 하단에 페이지 번호 표시

    function displayMarker(place, i) {

         let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: createMarkerImage(i) 
         })
        
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      
        //getLat : 위도 반환 / getLng : 경도 반환
        var latlng = [];
        //거리 배열
        var distance = 0;
        
        
        latlng[0]=markers[0].getPosition();
        latlng[1]=marker.getPosition();
        
    
        // polyline.setPath(latlng)
        // polyline.setMap(map)
        //경도, 위도로 지점 사이 거리 계산, m로 단위 변환
        distance += Math.sqrt(Math.pow(Math.abs(latlng[0].getLat()-latlng[1].getLat()),2)+Math.pow(Math.abs(latlng[0].getLng()-latlng[1].getLng()),2))* 60 * 1.1515 * 1609.344;
        
        showDistance(getTimeHTML(distance),latlng[1]);

      })
    }

    function getTimeHTML(distance) {

      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = distance / 62.5 | 0;
      var walkHour = '', walkMin = '';
     
      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
          walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
      }
      walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'
     
      // // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      // var bycicleTime = distance / 227 | 0;
      // var bycicleHour = '', bycicleMin = '';
     
      // // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      // if (bycicleTime > 60) {
      //     bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
      // }
      // bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'
     
      
      
     
      
      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += '    <li>';
      content += '        <span class="label">총거리</span><span class="number">' + Math.round(distance) + '</span>m';
      content += '    </li>';
      content += '    <li>';
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += '    </li>';
      // content += '    <li>';
      // content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
      // content += '    </li>';
      content += '</ul>'
     
      return content;
     }
     
    function showDistance(content, position) {
    
        distanceOverlay.setContent(content)
        distanceOverlay.setPosition(position)
        distanceOverlay.setMap(map);
   
  }
    //마커에 숫자 표시
    function createMarkerImage(i){
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
         var imageSize = new kakao.maps.Size(36, 37);
         var imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (i*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };
        return new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    }
  }, [searchPlace])

  return (
    <div >
      <div
        id="myMap"
        style={{
          width: '450px',
          height: '400px'
        }}
      ></div>
{ Places.length >= 1 &&

      <div id="result-list" style={{
        "width": "100%",
        "height": "250px",
        "overflow": "auto"}}>
        {Places.map((item, i) => (
           <div key={i} style={{ marginTop: '20px' }}>
              <Grid container spacing={3} p={2}>
                <Grid md={4} mt={3} style={{ "textAlign" : "center"}} >
                  <span className='cp_modal_num'>{i+1}</span>
                </Grid>
                <Grid md={5} mt={2}>
                  <PlaceList 
                  key={i}
                  index = {i}
                  place_name = {item.place_name}
                  road_address_name = {item.road_address_name}
                  phone = {item.phone}
                  />
                </Grid>
                <Grid md={3}  mt={2}>
                <button className='cp_button_modal' onClick = {() =>{setPlaceName(item.place_name); setPlaceAddress(item.road_address_name)}}> 선택</button>
                </Grid>
              </Grid>
                <hr/>
          
            </div>
            
        ))}
        
      </div>
}

    </div>
  )
}

export default MapContainer