import React, { useState } from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Dehradun", "Bangalore", "Delhi"]
  },
  {
    filterType: "Industry", 
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType: "Salary",
    array: ["5-10 LPA", "10-20 LPA", "20+ LPA"] 
  }
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (type, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    return (
        <div className="bg-[#161B22] rounded-xl shadow-lg p-6 border border-gray-700 h-fit">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-100">Filter Jobs</h3>
                <button 
                    onClick={() => setSelectedFilters({})}
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                >
                    Clear All
                </button>
            </div>
            
            <div className="space-y-6">
                {filterData.map((filter) => (
                    <fieldset key={filter.filterType}>
                        <legend className="font-semibold text-gray-200 mb-3">{filter.filterType}</legend>
                        <div className="space-y-2">
                            {filter.array.map((item) => (
                                <label key={item} className="flex items-center cursor-pointer text-gray-400 hover:text-gray-200 transition-colors">
                                    <input 
                                        type="radio" 
                                        name={filter.filterType} 
                                        value={item}
                                        checked={selectedFilters[filter.filterType] === item}
                                        onChange={() => handleFilterChange(filter.filterType, item)}
                                        className="sr-only peer" // Hide default radio button
                                    />
                                    <span className="w-4 h-4 rounded-full border-2 border-gray-500 mr-3 flex items-center justify-center peer-checked:border-purple-500">
                                        <span className="w-2 h-2 rounded-full bg-purple-500 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
                                    </span>
                                    {item}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;
