import React from 'react'

//React PDF
import { Document, Page, Text, View,  StyleSheet, Link, Rect, Svg, PDFViewer } from "@react-pdf/renderer";


function PalettePdf() {

    const colors = ['#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6'];

  return (

    <Document>
        
      <Page size="A4" style={styles.page}>
      <Text x="10" y="30">
          Título
        </Text>
    <div style={styles.colorSet} >
        {colors.map((color, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <View style={{ width: 100, height: 300, backgroundColor: color }} />
            <Text x="10" y="30">
          {color}
        </Text>
          </View>
        ))}
    </div>
    <Text x="10" y="30"  >
          Palette by: Author.
    </Text>
    <View
            style={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <Text>Visit: WeColor for more</Text>
          </View>
      </Page>
    </Document>
  )
}


const styles = StyleSheet.create({
    page: { padding: 30, 
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    border:"2px solid orange"
    },

    colorSet:{
        display:"flex",
        flexDirection:"row",
        marginTop:"30px"
    }

  });


export default PalettePdf