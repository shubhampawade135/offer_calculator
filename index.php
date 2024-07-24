<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Cost Calculator</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <!-- Assuming FontAwesome 5 -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <style>
        /* Add your custom styles here */
    </style>
</head>
<body>
    <div class="container">
        <h1>Service Cost Calculator</h1>
        <div class="input-group">
            <input type="number" id="amount" placeholder="Enter amount in USD" min="1">
            <button onclick="calculate()">Check</button>
        </div>
        <div id="resultContainer" class="result-container"></div>
        <div id="selectionSummary" class="selection-summary"></div>
    </div>

    <!-- Modal structure -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Enter Your Information</h2>
            <form id="modalForm" action="sendEmail.php" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="comment">Comment:</label>
                <textarea id="comment" name="comment" rows="4"></textarea>
                <button type="submit" id="submitBtn">Submit</button>
                <!-- <div id="loadingArea" class="d-none">
                    <i id="loadingIcon" class="fa fa-spinner fa-spin"></i><span id="loadingText"> Loading...</span>
                </div> -->
            </form>
        </div>
    </div>

    <script>
    $(document).ready(function() {
        // Close modal when close button is clicked
        $('.close').click(function() {
            $('#modal').hide();
        });

        // Handle form submission
        $('#modalForm').submit(function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Client-side validation (you should define this function)
            if (validateForm()) {
                // Disable submit button and show loading spinner
                $('#submitBtn').prop('disabled', true);
                $('#loadingArea').removeClass('d-none');

                // Perform AJAX request
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function(response) {
                        // Handle success response
                        alert('Thank you for your message. We will contact you shortly!');
                     
                        $('#submitBtn').prop('disabled', false); // Re-enable submit button
                       
                        $('#modal').hide(); // Optionally hide modal after submission
                      
                       location.reload();
                    },
                    error: function(error) {
                        // Handle error response
                        alert('Error submitting form.');
                        $('#submitBtn').prop('disabled', false); // Re-enable submit button
                       
                    }
                });
            }
        });

        // Function to validate form fields (define your validateForm function here)
        function validateForm() {
            // Example validation logic
            var name = $('#name').val().trim();
            var email = $('#email').val().trim();
            var comment = $('#comment').val().trim();
            if (name === '' || email === '' || comment === '') {
                alert('Please fill out all fields.');
                return false;
            }
            return true;
        }
    });
 </script>
    </body>
</html>
