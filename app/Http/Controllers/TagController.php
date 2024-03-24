<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    
    public function index(Request $request)
    {
        
        if($request->filled('search')){

            $tags = Tag::search($request->search)->paginate(3);

        }else{
            $tags = Tag::paginate(3);
        }

      

        return Inertia::render('Tags/Index',compact('tags'));
    }

    public function store(TagRequest $request)
    {
       

        Tag::create($request->all());

        return to_route('tags.index')->with('success','Tag Created Sucessfully');
    }


    public function update(TagRequest $request, Tag $tag)
    {
           
        $tag->update($request->all());

        return to_route('tags.index')->with('success','Tag Updated Sucessfully');
        
      
    }

    public function destroy(Tag $tag)
    {
       $tag->delete();

       return to_route('tags.index')->with('success','Tag deleted successfully !');
    }
}
