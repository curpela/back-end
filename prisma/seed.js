const { Photon } = require("@prisma/photon");
const photon = new Photon();

async function main() {
  const skyelar = await photon.users.create({
	  data: {
	firstName: "Skyelar",
	lastName: "Carroll",
	username: "skyelar",
	password: "$argon2id$v=19$m=4096,t=10,p=1$kAh+YlFdxmejQSvdv8hYAQ$T9cWnNkkAhE6T5ZuZfCYvp+eqdamAB/7sbWK2EOSh446PGBgZfN4m7QmUKYiXPipGJAQB7TiEEtSrj1osOHXvA",
	email: "skyelar@curpela.com",
	posts: {
		create: [
			{
				description: "Malibu",
				media: {
					create: {
					  url: "https://www.toptenrealestatedeals.com/wp-content/uploads/2019/07/wk_5d268d22549d8.jpg",
					  contentType: "image/jpeg"
					}
				}
			},
			{
			  description: "Austin Texas 😍",
			  media: {
				  create: {
						url: "https://www.kbhome.com/assets/images/Community%20Images/Texas/Austin%20-%20San%20Marcos/Mason%20Hills%20-%20Hallmark%20Collection/Mason%20Hills_3125_Ext_1200.jpg?format=jpg",
						contentType: "image/jpeg"
				  }
			  }
		  },
		  {
			  description: "Mediterranean!",
			  media: {
				  create: {
						url: "https://freshome.com/wp-content/uploads/2018/09/Mediterranean-2.jpg",
						contentType: "image/jpeg"
					  }
			  }
		  }
		]
	}
  }})

  await photon.users.create({
    data: {
      firstName: "Anthony",
      lastName: "Venturini",
      username: "adventurini",
      password: "$argon2id$v=19$m=4096,t=10,p=1$kAh+YlFdxmejQSvdv8hYAQ$T9cWnNkkAhE6T5ZuZfCYvp+eqdamAB/7sbWK2EOSh446PGBgZfN4m7QmUKYiXPipGJAQB7TiEEtSrj1osOHXvA",
	  email: "anthony@curpela.com",
	  following: {
		create: {
			following: {
				connect: {
					id: skyelar.id
				}
			}
		}
	  },
	  posts: {
		  create: [
			  {
				  description: "Malibu",
				  media: {
					  create: {
						url: "https://www.toptenrealestatedeals.com/wp-content/uploads/2019/07/wk_5d268d22549d8.jpg",
						contentType: "image/jpeg"
					  }
				  }
			  },
			  {
				description: "Austin Texas 😍",
				media: {
					create: {
						  url: "https://www.kbhome.com/assets/images/Community%20Images/Texas/Austin%20-%20San%20Marcos/Mason%20Hills%20-%20Hallmark%20Collection/Mason%20Hills_3125_Ext_1200.jpg?format=jpg",
						  contentType: "image/jpeg"
					}
				}
			},
			{
				description: "Mediterranean!",
				media: {
					create: {
						  url: "https://freshome.com/wp-content/uploads/2018/09/Mediterranean-2.jpg",
						  contentType: "image/jpeg"
						}
				}
			},
			{
				description: "Santa Monica!",
				media: {
					create: {
						  url: "https://www.luxury-architecture.net/wp-content/uploads/2018/03/1521483306-7311-924-palisades-big-19.jpg",
						  contentType: "image/jpeg"
						}
				}
			},
			{
				description: "Miami!",
				media: {
					create: {
						  url: "https://www.sothebysrealty.com/extraordinary-living-blog/wp-content/uploads/2012/12/4374082-w-dilido-dr-miami-beach.jpg?w=550&h=412",
						  contentType: "image/jpeg"
						}
				}
			},
			{
				description: "Modern home aesthetic",
				media: {
					create: {
						  url: "https://static.dezeen.com/uploads/2018/08/high-desert-modern-deforest-architects-architecture-house-oregon-usa_dezeen_2364_hero.jpg",
						  contentType: "image/jpeg"
						}
				}
			}
		  ]
	  }
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
