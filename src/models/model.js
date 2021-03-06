import ko from 'knockout';

var model = {
	// Partner data
	Locations : [
		{
			title: 'Nipe Tumaini',
			city: 'Nairobi',
			country: 'Kenya',
			description: 'In a dry region of Kenya\'s Rift Valley, this children\'s home offers hope and healing to extremely vulnerable kids. Nipe Tumaini means “give me hope” in Swahili, and that is exactly what this family-style home is doing. With a focus on sustainability and holistic care, the home is surrounded by abundant gardens and staffed with caring house parents. Now precious children who had been abandoned and abused are being lovingly nourished in both body and soul.',
			coordinates: {
				lat: -1.285289,
				lng: 36.579728
			},
			searchTerms: ['Nipe Tumaini']
		}, {
			title: 'Path of Hope',
			city: 'Shinyanga',
			country: 'Tanzania',
			description: 'The rural region of Shinyanga, in northern Tanzania, is known for extreme poverty, food shortages, and lack of access to education. Path of Hope is a church-based ministry serving children affected by HIV/AIDS and extreme poverty. Many of the children here have never heard the gospel and have never been to school. Lahash and Path of Hope are working hard to change that, one family at a time.',
			coordinates: {
				lat: -3.671110,
				lng: 33.424168
			},
			searchTerms: ['Path of Hope', 'Shinyanga']
		}, {
			title: 'Grace & Healing Ministry',
			city: 'Dodoma',
			country: 'Tanzania',
			description: 'In Dodoma, Tanzania, a group of women at a local church were moved by the plight of those in their community suffering with HIV/AIDS, so they met, prayed, and then founded a ministry. Lahash is honored to partner with the passionate and creative staff of Grace & Healing Ministry as they make a positive difference in so many lives. Children once at high risk of extreme neglect due to their poor health and poverty now thrive as they attend school, live in stable homes, and fill the halls of a local church with laughter.',
			coordinates: {
				lat: -6.158543,
				lng: 35.744421
			},
			searchTerms: ['Grace & Healing Ministry', 'Dodoma']
		}, {
			title: 'Albino Peacemakers',
			city: 'Arusha',
			country: 'Tanzania',
			description: 'Tanzania has the highest rate of albinism in the world. Children born with albinism not only suffer the physical effects of extreme sensitivity to the sun and poor vision, but often experience social stigma, abuse, and violence as well. Living with albinism herself, Sister Martha established Albino Peacemakers to provide needed advocacy, care, safety, and hope for people like her in the surrounding community and beyond.',
			coordinates: {
				lat: -3.3981412,
				lng: 36.6071722
			},
			searchTerms: ['Albino Peacemakers', 'Arusha', 'Albinism']
		}, {
			title: 'Rebuilding Rwanda',
			city: 'Kigali',
			country: 'Rwanda',
			description: 'Founded by a local pastor who survived the genocide, our Rwandan Ministry partners have always been focused on bringing hope and healing through restored relationships. Since 1996 they have been serving orphans in the country\'s capital city of Kigali. Now through partnership with Lahash, the ministry is expanding into the rural outskirts of the city where a new generation of vulnerable children are struggling against poverty, disease, and lack of education. Through the local church they are reaching out to change these young lives with the love and good news of Jesus.',
			coordinates: {
				lat: -1.953768,
				lng: 30.096305
			},
			searchTerms: ['Rwanda']
		},
	],

	Location: function(data) {
		this.title = data.title;
		this.city = data.city;
		this.country = data.country;
		this.description = data.description;
		this.coordinates = data.coordinates;
		this.hide = ko.observable(false);
		this.searchTerms = data.searchTerms;
	}
};

export default model;
