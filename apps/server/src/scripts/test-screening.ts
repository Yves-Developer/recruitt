const testTrigger = async () => {
    try {
        const jobId = "69df5edfaff59e8ea25be323"; 
        console.log(`Triggering screening for job ${jobId}...`);
        
        const response = await fetch(`http://localhost:5000/api/screening/trigger/${jobId}`, {
            method: "POST"
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Success:", data);
        } else {
            console.error("Error Status:", response.status);
            console.error("Error Data:", data);
        }
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

testTrigger();
