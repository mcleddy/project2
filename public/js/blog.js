$(document).ready(function() {
    // blogContainer holds all of our posts
    var globalTimeDiff = 0;
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;

    // This function grabs posts from the database and updates the view
    function getPosts(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/posts" + categoryString, function(data) {
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/posts/" + id
            })
            .then(function() {
                getPosts(postCategorySelect.val());
            });
    }

    // Getting the initial list of posts
    getPosts();
    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer
    function initializeRows() {
        globalTimeDiff = 0;
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        blogContainer.append(postsToAdd);
        $("#total-hours").text(globalTimeDiff)
    }


    // This function constructs a post's HTML
    function createNewRow(post) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");

        var newPostTitle = $("<h2 id=title>");
        var newPostClockIn = $("<small id=clockIn>");
        var newPostDate = $("<small id=clockOut>");
        var newPostCategory = $("<h5 id=organization>");

        newPostCategory.text(post.category);
        newPostCategory.css({
            float: "right",
            "font-weight": "700",
            "margin-top": "-15px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        newPostTitle.text(post.title + " ");
        newPostClockIn.text(post.clockIn);
        var formattedDate = new Date(post.createdAt);
        //formattedDate = moment(formattedDate);
        newPostClockIn = new Date(post.clockIn)
        newPostDate.text(formattedDate);
        //This function will print out the amount of time that has 
        var timeDiff = (formattedDate.getTime() - newPostClockIn.getTime());
        // get seconds 
        timeDiff /= 1000;
        var seconds = Math.abs(timeDiff);
        var newPostTimeDiff = timeDiff

        ////////////////////////////////////////////////////////////////////////
        globalTimeDiff += seconds / 3600
        var times = [
            timeDiff + newPostTimeDiff
        ];
        newPostCardHeading.prepend(times);
        newPostCardHeading.append(newPostClockIn);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostCategory);
        newPostTitle.append(newPostDate);
        newPostCard.append(newPostCardHeading);
        newPostCardHeading.append(newPostTimeDiff + " seconds");
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }


    //this function will calculate the total time


    // This function figures out which post we want to delete and then calls
    // deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty() {
        blogContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet for this, organization <a href='/cms'>here</a> in order to create a new log.");
        blogContainer.append(messageH2);
    }

    // This function handles reloading new posts when the category changes
    function handleCategoryChange() {
        var newPostCategory = $(this).val();
        getPosts(newPostCategory);
    };

});