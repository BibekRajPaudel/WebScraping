let filterData;
try {
    filterData = async (payloadData, response) => {
        let payload = {};
        payload._id = ObjectId("6204bd8b8dc3dd1a637081ff"),
        payload.containerNo = response.container.containerNo;
        payload.status = response.container.status || null;
        return payload
    }
} catch (error) {
    console.log(error)
}


module.exports = filterData