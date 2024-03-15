import React, {useState, useEffect} from 'react'
import SamplePage1 from '../pages/SamplePage1'
import FourHundredFour from '../pages/FourHundredFour'
import SamplePage2 from '../sampletest/samplepage2'
import Testpage1 from '../test/testpage1'
import Testpage2 from '../test/testpage2'
import SamplePage3 from '../sampletest/samplepage3'
import SamplePage4 from '../sampletest/samplepage4'
// import Samplepage5 from '../sampletest/samplepage5'
// import SamplePage6 from '../sampletest/samplepage6'
// import SamplePage7 from '../sampletest/samplepage7'
// import SamplePage8 from '../sampletest/samplepage8'
// import SamplePage9 from '../sampletest/samplepage9'
import SamplePage10 from '../sampletest/samplepage10'
import GagevueCalendar from '../gagevueMain/GagevueCalendar'

const Content = (props) => {
  console.log('Content start')
  const [url, setUrl] = useState()


  console.log("props", props)
  let propsUrl = props.url
  console.log("propsUrl", propsUrl)

  let samplePageArr = [
    <SamplePage1/>,
    <SamplePage2/>,
    <SamplePage3/>,
    <SamplePage4 />,
    // <Samplepage5 />,
    // <SamplePage6 />,
    // <SamplePage7 />,
    // <SamplePage8 />,
    // <SamplePage9 />,
    <SamplePage10/>,
  ]

  let gagevuePageArr = [
    <GagevueCalendar/>,
  ]

  let testMenuArr = [<Testpage1/>, <Testpage2/>]

  let systemMenuArr = [
    //  <notice />, <comnCodMgr />, <FileSample />, <VueStudy />
  ]

  const content = () => {
    console.log('content start')
    // console.log(samplePageArr[3].type.name.toLowerCase())
    // const samplePageName = samplePageArr[3].type.name.toLowerCase();
    // alert(propsUrl+','+samplePageName)
    let returnValue = ''
    let flag = false
    // alert(propsUrl)
    // console.log("propsUrl", propsUrl)

    if (propsUrl) {
      if (!(propsUrl.indexOf('samplepage') === -1)) {
        // 연습
        for (let i = 0; i < 10; i++) {
          // alert(i)
          // console.log(i)
          let samplePageName = ''
          if (!(undefined === samplePageArr[i])) {
            samplePageName = samplePageArr[i].type.name.toLowerCase()
          }
          if (samplePageName === propsUrl) {
            // alert('안타야됨')
            returnValue = samplePageArr[i]
            // if (!(typeof returnValue === 'undefined'))
            flag = true
            break
          }
          // if (!flag) returnValue = <FourHundredFour/>
          // alert(i)
          /*
          if ('samplepage' + i === propsUrl) {
              i = i - 1
              // alert(samplePageName+','+propsUrl)

              if (samplePageName === propsUrl) {
                  console.log('여기!!!!!!!!!!!!!!!')
                  for(let j=0;j<=10;j++) {
                      returnValue = samplePageArr[i]
                  }
              }

              // if (!(typeof returnValue === 'undefined')) flag = true
              // break
          }
          */
        }
      } else if(propsUrl.indexOf('Gagevue') > -1) {
        console.log("gagevuePageArr", gagevuePageArr)
        // 연습
        gagevuePageArr.forEach(function(gagevue, idx){
          console.log("gagevuePageArr.forEach", gagevue.type.name)
          if(gagevue.type.name === propsUrl){
            returnValue = gagevue;
            flag = true;
          }
        })
      }else if (!(propsUrl.indexOf('testpage') === -1)) {
        // 임시
        if ('testpage1' === propsUrl) returnValue = testMenuArr[0]
        else returnValue = testMenuArr[1]

        if (!(typeof returnValue === 'undefined')) flag = true
      } else {
        // 시스템관리
        if ('notice' === propsUrl) {
          returnValue = systemMenuArr[0]
        } else if ('comnCodMgr' === propsUrl) {
          returnValue = systemMenuArr[1]
        } else if ('FileSample' === propsUrl) {
          returnValue = systemMenuArr[2]
        } else if ('VueStudy' === propsUrl) {
          returnValue = systemMenuArr[3]
        }
        if (!(typeof returnValue === 'undefined')) flag = true
      }
    }

    // alert(flag+','+returnValue)
    if (!flag || returnValue === '') returnValue = <FourHundredFour/>
    // console.log('returnValue start')
// console.log(returnValue)
    return returnValue
  }

  return (
      <>
        <div id='content'>
          {/* {propsUrl} */}
          <div>{content()}</div>
        </div>
      </>
  )
}
export default Content
