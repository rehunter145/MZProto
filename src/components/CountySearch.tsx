import { useState } from 'react'
import { Search, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react'
import { setCounty, getSupportedCities } from '../utils/countySearch'

function CountySearch() {
  const [cityInput, setCityInput] = useState('')
  const [searchResult, setSearchResult] = useState<{
    searched: boolean
    city: string
    found: boolean
    urlCount: number
  } | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSearch = () => {
    if (!cityInput.trim()) return

    const result = setCounty(cityInput.trim())
    setSearchResult({
      searched: true,
      city: result.city,
      found: result.found,
      urlCount: result.urls.length
    })
    setSuggestions([])
  }

  const handleInputChange = (value: string) => {
    setCityInput(value)
    setSearchResult(null)

    if (value.length > 1) {
      const cities = getSupportedCities()
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (city: string) => {
    setCityInput(city)
    setSuggestions([])
    const result = setCounty(city)
    setSearchResult({
      searched: true,
      city: result.city,
      found: result.found,
      urlCount: result.urls.length
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          County Real Estate Search
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Enter a city name to open the county real estate property search website
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
        <div className="relative">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name (e.g., Raleigh, Charlotte, Durham...)"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 md:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                       transition-colors flex items-center gap-2 font-medium shrink-0"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200
                          dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                           text-gray-900 dark:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {searchResult && (
          <div className="mt-4">
            {searchResult.found ? (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20
                            border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    County website{searchResult.urlCount > 1 ? 's' : ''} opened for {searchResult.city}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    {searchResult.urlCount} tab{searchResult.urlCount > 1 ? 's' : ''} opened in your browser
                    {searchResult.urlCount > 1 && ' (this city spans multiple counties)'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20
                            border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <ExternalLink className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">
                    No county website found for "{searchResult.city}"
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    This city is not in our database. Try a nearby city or check the supported cities below.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Coverage Area
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CoverageCard
            county="Wake County, NC"
            cities={["Raleigh", "Cary", "Apex", "Wake Forest", "Morrisville"]}
          />
          <CoverageCard
            county="Mecklenburg County, NC"
            cities={["Charlotte", "Huntersville", "Matthews", "Cornelius"]}
          />
          <CoverageCard
            county="Durham County, NC"
            cities={["Durham"]}
          />
          <CoverageCard
            county="Guilford County, NC"
            cities={["Greensboro", "High Point", "Jamestown"]}
          />
          <CoverageCard
            county="Greenville County, SC"
            cities={["Greenville", "Mauldin", "Greer", "Simpsonville"]}
          />
          <CoverageCard
            county="York County, SC"
            cities={["Rock Hill", "Fort Mill", "Tega Cay"]}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          And many more cities across NC and SC! Start typing to see suggestions.
        </p>
      </div>
    </div>
  )
}

function CoverageCard({ county, cities }: { county: string; cities: string[] }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{county}</h4>
      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        {cities.map((city, index) => (
          <li key={index}>• {city}</li>
        ))}
        {cities.length > 3 && <li className="text-gray-500">+ more...</li>}
      </ul>
    </div>
  )
}

export default CountySearch
