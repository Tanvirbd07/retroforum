

  const loadPost = async (text="") => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${text}`);
    const data = await response.json();
    const allData = data.posts;
    const postContainer = document.getElementById("post-container");
    postContainer.textContent = '';
    
    allData.forEach((item) => {
        let active = '';
        if(item.isActive) {
            active =`
            <div class="h-5 w-5 rounded-full   bg-green-500 relative border-2 border-white lg:bottom-16 lg:left-12 bottom-8 left-6">
                                    </div>`
        }
        else{
            active =`
            <div class="h-5 w-5 rounded-full   bg-red-500 relative border-2 border-white lg:bottom-16 lg:left-12 bottom-8 left-6">
                                    </div>`
        }
        const div = document.createElement("div");
        div.classList.add('bg-[#f1f2fe]', 'border-black' ,'border' ,'hover:border-green-500' ,'rounded-3xl' ,'p-7' ,'lg:flex' ,'lg:gap-8' ,'mb-10');
        div.innerHTML = `
        <div class="lg:w-[20%] flex justify-center items-center my-10">
                                <div
                                    class="lg:h-32 lg:w-32 h-20 w-20 absolute  flex rounded-3xl items-center justify-center bg-[url(${item.image})] bg-cover bg-no-repeat">

                                    ${active}
                                </div>
                            </div>
                            <div class="lg:w-[80%] ">
                                <div class="">
                                    <div class="flex gap-5">
                                    <p># ${item.category} </p>
                                        <p>Author: ${item.author.name} </p>
                                    </div>
                                    <div class="text-start pt-3 border-b-2 border-dashed">
                                        <h3 class="text-3xl font-bold">${item.title} </h3>
                                        <p class="text-[#76778b] py-4  "> ${item.description} </p>
                                    </div>
                                    <div class="py-2 flex justify-between gap-3">
                                        <div class="text-start flex gap-3 lg:gap-5">
                                            <div class="flex items-center text-[#87889a] text-[18px] gap-2 lg:gap-4">
                                                <i class="fa-solid fa-inbox"></i>
                                                <p> ${item.comment_count} </p>
                                            </div>
                                            <div class="flex items-center text-[#87889a] text-[18px] gap-2 lg:gap-4">
                                                <i class="fa-regular fa-eye"></i>
                                                <p>${item.view_count}</p>
                                            </div>
                                            <div class="flex items-center text-[#87889a] text-[18px] gap-2 lg:gap-4">
                                                <i class="fa-regular fa-clock"></i>
                                                <p>${item.posted_time}</p>
                                            </div>
                                        </div>
                                        <div onclick="clicked('${item.title.replace('\'',"")}', '${item.view_count}')" class="bg-green-400 text-white p-2 h-10 w-10 rounded-full text-[18px]"><i
                                                class="fa-solid fa-envelope"></i></div>
                                    </div>
                                </div>
                            </div>`;
                                                      
          postContainer.appendChild(div);
    
          
        
    });
    
  };
  let click = 0;
  const clicked = (title , watched) =>{
    
    const read = document.getElementById("read");
    const div = document.createElement("div");
    div.classList.add('bg-white','p-5','rounded-3xl','flex','gap-2','mt-4');
    div.innerHTML =`
    <div>
    <h3 class="font-semibold">${title} </h3>
</div>
<div class="flex gap-2 items-center text-[#707181]">
    <i class="fa-regular fa-eye"></i>
    <h3>${watched} </h3>
</div>`;
    read.appendChild(div);
    click++;
    document.getElementById("read-count").innerText = click;
    console.log("clicked" , title , watched)
  }
  const search =  () => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    loadPost(`?category=${inputText}`);
    
  }
  const latestPost = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    const postContainer = document.getElementById("latest-post");
    data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add( 'card', 'card-compact', 'bg-base-100', 'shadow-xl','p-5', 'text-start') ;
    div.innerHTML = `
    <figure><img src="${item.cover_image} " /></figure>
                        <div class="card-body">
                          <div class="text-[#7b7c8a] gap-5 flex items-center">
                            <i class="fa-regular fa-calendar-days"></i>
                            <h3>${item.author.posted_date === undefined ? "No publish date" : item.author.posted_date } </h3>
                          </div>
                          <div>
                            <h3 class="text-2xl font-semibold">${item.title} </h3>
                                <p class="text-[#7b7c8a] font-semibold my-5">${item.description}</p>
                          </div>
                          <div class="flex items-center justify-center gap-5">
                            <div class="h-16 w-16 rounded-full bg-cover bg-[url(${item.profile_image})] "></div>
                            <div><h3 class="text-xl">${item.author.name}
                            </h3>
                        <p>${item.author.designation === undefined ? "Unknown" : item.author.designation  }</p></div>
                          </div>
                        </div>
                    </div>`;
                    postContainer.appendChild(div); 
    })
  } 
  
  loadPost()
  latestPost()
  