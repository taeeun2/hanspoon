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
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
      // draggable: false
    }
    const map = new kakao.maps.Map(container, options)
    console.log(map.getCenter())

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
      })
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