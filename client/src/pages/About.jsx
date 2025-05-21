import React from 'react'
import { useSelector } from 'react-redux'

export default function About() {
  const {currentUser} = useSelector(state => state.user);
  if(currentUser){
  return (
    <div className='px-4 py-12 '>
      <h1 className='mb-4 text-3xl font-bold text-slate-800'>About</h1>
      <p className='mb-4 text-slate-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, cumque quos nulla hic laudantium laborum maxime repellat. Ipsa officiis earum ut explicabo eaque enim? Dolor nulla aliquid minus recusandae quasi.</p>
      <p className='mb-4 text-slate-700'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, aperiam. Corrupti sint voluptas odit, quisquam repellat placeat qui. Facilis hic repellendus quaerat, voluptatum possimus nisi impedit quo ab quis harum.</p>
      <p className='mb-4 text-slate-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eos accusantium iste est autem. Possimus repellat molestias reiciendis eveniet necessitatibus ea, quibusdam praesentium adipisci aliquam repellendus veritatis optio obcaecati modi!</p>
    </div>
  )}else{
    return(
    <div className='px-4 py-12 '>
      <h1 className='mb-4 text-3xl font-bold text-slate-800'>About</h1>
      <p className='mb-4 text-slate-700'>Please sign-in first</p>
    </div>
    );
  }
}
