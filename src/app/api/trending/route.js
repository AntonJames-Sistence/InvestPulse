
import { NextResponse } from "next/server";
import { set, ref, push, update, get, off } from "firebase/database";
import { DB } from "../../data/firebase";
import { register } from "module";

// export async function GET() {
//     const facebookRef = ref(DB, "trending_coins");

//     try {
//       const snapshot = await get(facebookRef);

//       if (snapshot.exists()) {
//         const allPost = Object.values(snapshot.val());
//         return NextResponse.json(allPost);
//       }
//       throw new Error("No Facebook post");
//     } catch (error) {
//       return NextResponse.error("No post yet");
//     } finally {
//       off(facebookRef);
//     }
//   }

  export async function PUT() {
    const url = 'https://api.coingecko.com/api/v3/search/trending';
  
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error("Failed to fetch trending coins");
      }
  
      const coinsData = await res.json();

      console.log(coinsData);
  
    //   const postData = fbData.posts.data;
  
    //   const cleanData = postData.map((post) => {
    //     if (!post) {
    //       return null;
    //     }
    //     const newPost = {};
  
    //     newPost.id = post.id;
    //     newPost.likes = post.likes.summary.total_count;
    //     newPost.comments = post.comments.summary.total_count;
    //     newPost.shares = post.shares?.count || 0;
    //     newPost.url = post.permalink_url;
    //     newPost.createdAt = post["created_time"];
  
    //     newPost.name = fbData.name;
    //     newPost.pfp = fbData.photos.data[0].images[0].source;
  
    //     const hasManyMedia = post.attachments.data[0].subattachments;
    //     newPost.images = [];
  
    //     return newPost;
    //   });

    //   const firebase = {};
    //   firebase["trending_coins"] = cleanData;
    //   update(ref(DB), firebase);
  
      return NextResponse.json("Successfully updated data");
    } catch (error) {
      return NextResponse.error("Couldn't retrieve Facebook data, PUT route");
    }
  }