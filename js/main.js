function ShowIdeaForm()
{
    if(BX("popup-form") != null) {
        if(BX("popup-form").innerHTML == "")
        {
            BX("popup-form").appendChild(BX("idea-form-container").children[0]);
        }
        BX("popup-form").style.display = "block";
        BX("new-idea-name").focus();
    }
}

function HideIdeaForm()
{
    if(BX("popup-form") != null)
    {
        BX("popup-form").style.display = "none";
    }
}

var bGaSend = false;

function IsValidForm()
{
    if(BX("new-idea-name") != null && BX("new-idea-email") != null && BX("new-idea-text") != null)
    {
        return (BX("new-idea-name").value.length > 0 && BX("new-idea-email").value.length > 0 && BX("new-idea-text").value.length > 0)
    }
    else
    {
        return false;
    }
}

function KeySubmitForm(e)
{
    if(e.keyCode=='13' || e.keyCode=='10')
    {
        if(e.ctrlKey)
        {
            if(IsValidForm())
            {
                BX("new-idea-submit").click()
                return true;
            }
            else
            {
                alert("Заполните пожалуйста все поля!");
                return false;
            }
        }
        else
        {
            if (document.activeElement == BX('new-idea-text'))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    if(e.keyCode=='27')
    {
        HideIdeaForm();
    }
}

function SubmitForm()
{
    if(IsValidForm())
    {
	if(!bGaSend)
	{
		ga('send', 'event', 'Idea', 'Submit');
		bGaSend = true;
	}
        BX("new-idea-submit").click();
        return true;
    }
    else
    {
        alert("Заполните пожалуйста все поля!");
        return false;
    }
}

function ShowMoreTags()
{
    var tagsContainer = BX("right-tags");
    var curHeight = parseInt(tagsContainer.scrollHeight);
    tagsContainer.style.height = curHeight  + "px";
    BX('more-tags').parentNode.removeChild(BX('more-tags'));
}

function LoadPosts(loadButton)
{
    var numberLoadPage = parseInt(loadButton.dataset.currentpostpage) - 1;
    var category = "";
    loadButton.className = loadButton.className.replace("load-new", "loading");
    if(BX("category") != null)
    {
        category = parseInt(BX("category").dataset.categoryid);
    }

    if(numberLoadPage >= 1)
    {
        BX.ajax({
            method: 'POST',
            url: "/index_ajax.php",
            dataType: "html",
            data: {"PAGEN_1" : numberLoadPage, "getPosts" : "y", "category_id" : category},
            onsuccess: function (data)
            {
                BX("posts-list").innerHTML = BX("posts-list").innerHTML + data;
                loadButton.className = loadButton.className.replace("loading", "load-new");
                if(numberLoadPage == 1)
                {
                    loadButton.remove();
                }
                else
                {
                    loadButton.className = loadButton.className.replace("loading", "load-new");
                    loadButton.dataset.currentpostpage = numberLoadPage;
                }
            },
            onfailure: function (data)
            {
                console.log("Loading error");
                loadButton.className = loadButton.className.replace("loading", "load-new");
            }
        });
    }
}