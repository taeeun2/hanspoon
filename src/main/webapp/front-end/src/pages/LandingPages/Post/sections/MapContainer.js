import { Grid } from '@mui/material'
import select from 'assets/theme/components/form/select'
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import React, { useEffect, useState } from 'react'
import PlaceList from './PlaceList'

const { kakao } = window

const MapContainer = ({ searchPlace, searchRestaurant}) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])


  // 선택된 식당 이름 가져오기
  const setPlaceName = (name) => {
    console.log(name)
  }
  
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
    <div>
      <div
        id="myMap"
        style={{
          width: '450px',
          height: '500px',
        }}
      ></div>
      <div id="result-list">
        {Places.map((item, i) => (
           <div key={i} style={{ marginTop: '20px' }}>
              <PlaceList 
                key={i}
                index = {i}
                place_name = {item.place_name}
                road_address_name = {item.road_address_name}
                phone = {item.phone}
                searchRestaurant = {searchRestaurant}

                setPlaceName = {setPlaceName}
                />
            </div>
          // <div key={i} style={{ marginTop: '20px' }}>
          //   <Grid container alignItems="center" py={2}>
          //       <Grid item xs={12} sm={2} textAlign = "center">
          //           <MKTypography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
          //           {i + 1}
          //           </MKTypography>
          //       </Grid>
          //       <Grid item xs={12} sm={7}>
          //           {/* <a href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${item.place_name}`}><MKTypography variant="h6">{item.place_name}</MKTypography></a> */}
          //           <MKTypography variant="h6" >{item.place_name}</MKTypography>
          //           <MKTypography variant="button" style={{"fontSize" : "12px"}} >{item.road_address_name}</MKTypography><br/>
          //           <MKTypography variant="overline" style={{"marginLeft" : "3px"}}> 📞 {item.phone}</MKTypography><br/>
          //           <button style={{"border" : 0, "outline" : 0, "color" : "#3C5A91", "fontSize" : "12px", "backgroundColor" : "white", "textDecoration": "underline", "textUnderlinePosition":"under"}} onClick={() => window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${item.place_name}`, '_blank')}>[네이버 검색 링크]</button>
          //       </Grid>
          //       <Grid item xs={12} sm={3}>
          //           {/* <MKButton variant="gradient" color="dark" onClick={selectRestaurant(item.place_name)}> 선택</MKButton> */}
          //           <MKButton variant="gradient" color="dark" onClick={searchRestaurant}> 선택</MKButton>
          //       </Grid>
          //   </Grid>
          //   <hr/>
          // </div>
        ))}
        
      </div>
    </div>
  )
}

export default MapContainer