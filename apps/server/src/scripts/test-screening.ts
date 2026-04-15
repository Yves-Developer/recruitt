import axios from "axios";

const testTrigger = async () => {
    try {
        const jobId = "69df5edfaff59e8ea25be323"; // Using the ID from user error
        console.log(`Triggering screening for job ${jobId}...`);
        const response = await axios.post(`http://localhost:5000/api/screening/trigger/${jobId}`);
        console.log("Success:", response.data);
    } catch (error: any) {
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
};

testTrigger();
