export  const containerStyle = {
    fontSize:14,
    width: '98%',
    height:'90%',
    margin:'0% 1% 1% 1%'
}



export  const mapStyles = [
    {
        featureType: "poi", // Hide points of interest (e.g., businesses, landmarks)
        elementType: "all",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "road.local", // Simplify local roads
        elementType: "all",
        stylers: [{ visibility: "simplified" }],
    },
    {
        featureType: "transit", // Hide transit lines
        elementType: "all",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "landscape", // Tone down landscape details
        elementType: "all",
        stylers: [{ saturation: -50 }],
    },
];